# public/py/ttt_ai.py
# Bitboard: 9 bits for X, 9 bits for O (cells 0..8)
# Transposition table: dict keyed by (x_bits, o_bits, turn)

WIN_MASKS = [
    0b111000000, 0b000111000, 0b000000111,  # rows
    0b100100100, 0b010010010, 0b001001001,  # cols
    0b100010001, 0b001010100               # diags
]

TT = {}  # (x_bits, o_bits, turn) -> (score, best_move)

def _is_win(bits: int) -> bool:
    for m in WIN_MASKS:
        if (bits & m) == m:
            return True
    return False

def _is_full(x_bits: int, o_bits: int) -> bool:
    return (x_bits | o_bits) == 0b111111111

def _moves(x_bits: int, o_bits: int):
    occ = x_bits | o_bits
    for i in range(9):
        if (occ & (1 << (8 - i))) == 0:
            yield i

def _place(bits: int, move: int) -> int:
    # move 0..8 => set bit (8-move)
    return bits | (1 << (8 - move))

def _minimax(x_bits: int, o_bits: int, turn: str, alpha: int, beta: int):
    # turn: 'X' or 'O' = side to move (bot can be either, caller decides)
    key = (x_bits, o_bits, turn)
    if key in TT:
        return TT[key]

    if _is_win(x_bits):
        TT[key] = (1, None)   # X win
        return TT[key]
    if _is_win(o_bits):
        TT[key] = (-1, None)  # O win
        return TT[key]
    if _is_full(x_bits, o_bits):
        TT[key] = (0, None)   # tie
        return TT[key]

    if turn == 'X':
        best_score = -2
        best_move = None
        for mv in _moves(x_bits, o_bits):
            score, _ = _minimax(_place(x_bits, mv), o_bits, 'O', alpha, beta)
            if score > best_score:
                best_score, best_move = score, mv
            alpha = max(alpha, best_score)
            if beta <= alpha:
                break
        TT[key] = (best_score, best_move)
        return TT[key]
    else:
        best_score = 2
        best_move = None
        for mv in _moves(x_bits, o_bits):
            score, _ = _minimax(x_bits, _place(o_bits, mv), 'X', alpha, beta)
            if score < best_score:
                best_score, best_move = score, mv
            beta = min(beta, best_score)
            if beta <= alpha:
                break
        TT[key] = (best_score, best_move)
        return TT[key]

def best_move(x_bits: int, o_bits: int, turn: str) -> int:
    # returns 0..8
    score, mv = _minimax(x_bits, o_bits, turn, -2, 2)
    # If no mv (terminal), return -1
    return -1 if mv is None else mv

def reset_tt():
    TT.clear()
