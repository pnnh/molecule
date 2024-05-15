extends Object


signal plus_clicked

const fontAwesome = preload("res://addons/FontAwesome5/FontAwesome.gd")
 
func _ready():
	pass # Replace with function body.
	
func _init():
	print("Constructed!")
	
func newRow():
	var row = HBoxContainer.new()
	var btnRight = Button.new()
	btnRight.text = '-'
	row.add_child(_createIconButton())
	row.add_child(_create_Text_edit())
	row.add_child(btnRight)
	return row

func _onPlusPressed():
	print('hello pressed')
	emit_signal("plus_clicked")

func _createIconButton():
	var button = ToolButton.new()
	#button.text = 'click'
	#var style = StyleBoxFlat.new()
	#style.bg_color = Color.red
	#button.add_stylebox_override('normal', style)
	button.rect_min_size = Vector2(48, 48)
	button.margin_left = 14
	button.margin_top = 14
	var lab = Label.new() 
	button.add_child(_create_Plus_Icon()) 
	button.connect("pressed", self, "_onPlusPressed")
	return button

func _create_Plus_Icon():
	var plusIcon = fontAwesome.new()
	plusIcon.set_icon_name('plus')
	plusIcon.set_icon_name('solid')
	plusIcon.set_icon_size(48)
	return plusIcon

func _create_Text_edit():
	var text2 = LineEdit.new()
	text2.text = 'aaa' 
	var style = StyleBoxFlat.new()
	style.bg_color = Color.red
	text2.add_stylebox_override('normal', style)
	text2.add_color_override('font_color', Color.green)
	return text2
