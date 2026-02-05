# public/py/ttt_ai.py
#   index = x + y*3  (row-major)
#   move mask = 1 << index
#   bit = 1 << i   (NOT 1 << (8 - i))
# in toBitboards().

WIN_MASKS = [
    0b000000111, 0b000111000, 0b111000000,  # rows (top -> bottom)
    0b001001001, 0b010010010, 0b100100100,  # cols (left -> right)
    0b100010001, 0b001010100               # diags
]

FULL_MASK = 0b111111111  # all 9 cells occupied

TT = {}  # (x_bits, o_bits, turn) -> (score_from_X_perspective, best_move_index)

def _is_win(bits: int) -> bool:
    for m in WIN_MASKS:
        if (bits & m) == m:
            return True
    return False

def _is_full(x_bits: int, o_bits: int) -> bool:
    return ((x_bits | o_bits) & FULL_MASK) == FULL_MASK

def _moves(x_bits: int, o_bits: int):
    occ = (x_bits | o_bits) & FULL_MASK
    for i in range(9):
        if (occ & (1 << i)) == 0:
            yield i

def _place(bits: int, move_index: int) -> int:
    return bits | (1 << move_index)

def _minimax(x_bits: int, o_bits: int, turn: str):
    """
    Returns (score, best_move_index)
    Score is ALWAYS from X perspective:
      X win: +1
      O win: -1
      tie: 0

    turn is 'X' or 'O' (side to move).
    """
    key = (x_bits, o_bits, turn)
    if key in TT:
        return TT[key]

    # terminal
    if _is_win(x_bits):
        TT[key] = (1, -1)
        return TT[key]
    if _is_win(o_bits):
        TT[key] = (-1, -1)
        return TT[key]
    if _is_full(x_bits, o_bits):
        TT[key] = (0, -1)
        return TT[key]

    if turn == "X":
        best_score = -2
        best_move = -1
        for mv in _moves(x_bits, o_bits):
            score, _ = _minimax(_place(x_bits, mv), o_bits, "O")
            if score > best_score:
                best_score, best_move = score, mv
                if best_score == 1:  # can't beat a forced win
                    break
        TT[key] = (best_score, best_move)
        return TT[key]
    else:
        best_score = 2
        best_move = -1
        for mv in _moves(x_bits, o_bits):
            score, _ = _minimax(x_bits, _place(o_bits, mv), "X")
            if score < best_score:
                best_score, best_move = score, mv
                if best_score == -1:  # O found forced win (bad for X)
                    break
        TT[key] = (best_score, best_move)
        return TT[key]

def best_move(x_bits: int, o_bits: int, turn: str) -> int:
    # returns move index 0..8 in the SAME indexing as your React board array
    _, mv = _minimax(int(x_bits), int(o_bits), str(turn))
    return int(mv)

def reset_tt():
    TT.clear()
