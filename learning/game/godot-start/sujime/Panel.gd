extends Panel

const editorRow = preload("res://controls/editor/editor_row.gd")
const rowTscn = preload("res://controls/editor/row.tscn")

onready var container = $ScrollContainer
onready var vbox = $ScrollContainer/VBoxContainer
onready var scrollbar = $ScrollContainer.get_v_scrollbar()
onready var vbar = $VScrollBar
onready var label = $Label

# Called when the node enters the scene tree for the first time.
func _ready():
	#var theme = Theme.new()
	var styleBox = StyleBoxFlat.new()
	styleBox.bg_color = Color.red
	#theme.set_color("scroll", "VScrollBar", styleBox)
	#theme.set_color("font_color", "Label", Color.red)
	vbar.add_stylebox_override('scroll', styleBox)
	vbox.add_constant_override("separation", 16)
	vbox.add_constant_override("margin_top", 16)
	vbox.add_constant_override("margin_left", 16)
	vbox.add_constant_override("margin_bottom", 16)
	vbox.add_constant_override("margin_right", 16)
	#lab.theme = theme
	
	 
func addItem(btn):
	vbox.add_child(btn)
	yield(get_tree(), "idle_frame")
	container.scroll_vertical = scrollbar.max_value

# Called every frame. 'delta' is the elapsed time since the previous frame.
#func _process(delta):
#	pass

  

func _on_H1Button_pressed():
	var btn = Button.new()
	btn.text = "H1"
	addItem(btn)
	var theme = Theme.new()
	theme.set_color("font_color", "Label", Color.red)
	#label.theme.set_color("font_color", "Label", Color.red)
	label.add_color_override("font_color", Color.red)
	var label2 = Label.new()
	label2.text = 'aaaa'
	label2.theme = theme
	addItem(label2)


func _on_H2Button_pressed():
	var lab = Label.new()
	lab.text = "H2"
	addItem(lab)
	var styleBox = StyleBoxFlat.new()
	styleBox.bg_color = Color.white
	#styleBox.shadow_color = Color.green
	#styleBox.border_color = Color.blue
	scrollbar.add_stylebox_override('scroll', styleBox)


func _on_TextButton_pressed():
	var lab = LineEdit.new() 
	lab.text = "Text"
	addItem(lab)

func _handle_plus_clicked():
	print('plus clicked!')
	var lab = Label.new()
	lab.text = "aha plus clicked"
	addItem(lab)

func _on_ToolButton_pressed():
	var instance = editorRow.new()
	instance.connect("plus_clicked", self, "_handle_plus_clicked")
	var row = instance.newRow()
	addItem(row) 



func _on_addRow2_pressed():
	var row = rowTscn.instance()
	addItem(row)
