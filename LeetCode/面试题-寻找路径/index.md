which returns the position the player should arrive after step steps.
step may be negative: the player may go forward or backward
abs(step) is greater than 1 and less than 6
When current_position == 19 and step > 0 , go forward to path 26 -> 27 -> 28
When current_position == 25 and step < 0 , go backward to path 30 -> 29 -> 28
The map is circular: 33 goes forward to 1 and 1 goes backward to 33
Examples:
solution = Solution()
solution.find_next_node(1, 4) # 5
solution.find_next_node(5, -4) # 1
solution.find_next_node(17, 5) # 22
solution.find_next_node(19, 2) # 27
solution.find_next_node(27, -3) # 18
solution.find_next_node(30, 3) # 32
solution.find_next_node(32, -4) # 23
solution.find_next_node(25, -2) # 29
solution.find_next_node(33, 3) # 3
solution.find_next_node(1, -2) # 32

