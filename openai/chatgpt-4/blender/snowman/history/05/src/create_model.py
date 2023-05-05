import bpy
import math

def create_sphere(location, radius, name):
    bpy.ops.mesh.primitive_uv_sphere_add(location=location, radius=radius)
    bpy.context.active_object.name = name

def create_cylinder(location, radius, height, name):
    bpy.ops.mesh.primitive_cylinder_add(location=location, radius=radius, depth=height)
    bpy.context.active_object.name = name

def create_cone(location, radius, height, name):
    bpy.ops.mesh.primitive_cone_add(location=location, radius1=radius, depth=height)
    bpy.context.active_object.name = name

# 雪だるまを作成
def create_snowman():
    # 雪だるまのボディ
    create_sphere((0, 0, 1), 1, "snowman_body")
    create_sphere((0, 0, 2.7), 0.7, "snowman_head")

    # 雪だるまの目
    eye_radius = 0.1
    eye_offset = math.sqrt(0.7**2 - eye_radius**2)
    create_sphere((eye_offset, 0.35, 2.7), eye_radius, "snowman_eye_left")
    create_sphere((-eye_offset, 0.35, 2.7), eye_radius, "snowman_eye_right")

    # 雪だるまの鼻
    create_cone((0, 0.65, 2.7), 0.05, 0.3, "snowman_nose")

    # 雪だるまの腕
    create_cylinder((1.1, 0, 1.5), 0.05, 2, "snowman_arm_left")
    create_cylinder((-1.1, 0, 1.5), 0.05, 2, "snowman_arm_right")
    bpy.data.objects['snowman_arm_left'].rotation_euler = (0, 0, math.radians(-150))
    bpy.data.objects['snowman_arm_right'].rotation_euler = (0, 0, math.radians(150))

    # 雪だるまのボタン
    button_radius = 0.1
    button_offset = math.sqrt(1**2 - button_radius**2)
    create_cylinder((0, button_offset, 1.7), button_radius, 0.1, "snowman_button_top")
    create_cylinder((0, button_offset, 1.4), button_radius, 0.1, "snowman_button_middle")
    create_cylinder((0, button_offset, 1.1), button_radius, 0.1, "snowman_button_bottom")

# 既存のオブジェクトを削除
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)

# 雪だるまを作成
create_snowman()

# カメラとライトの位置を調整
bpy.data.objects['Camera'].location = (5, -5, 5)
bpy.data.objects['Camera'].rotation_euler = (math.radians(60), 0, math.radians(45))

light_data = bpy.data.lights['Light']
light_data.energy = 1000
light_data.type = 'SUN'
light_data.angle = math.radians(120)

bpy.data.objects['Light'].location = (5, -5, 10)
bpy.data.objects['Light'].rotation_euler = (math.radians(45), 0, math.radians(45))
