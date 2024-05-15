extends PanelContainer

onready var textEdit = $TextEdit

func _ready():
	pass # Replace with function body.

func _input(event):
	if event is InputEventKey:
		if event.pressed and event.scancode == KEY_ENTER:
			var size = textEdit.get_size()
			print("按下了回车" + String(textEdit.rect_size.y))
