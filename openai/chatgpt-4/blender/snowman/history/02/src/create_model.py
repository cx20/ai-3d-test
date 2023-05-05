import bpy
import math

# シーンをクリアする関数
def clear_scene():
    bpy.ops.object.select_all(action='DESELECT')
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete()

# 球体を追加する関数
def create_sphere(location, scale):
    bpy.ops.mesh.primitive_uv_sphere_add(location=location)
    sphere = bpy.context.active_object
    sphere.scale = scale
    return sphere

# 雪だるまを作成する関数
def create_snowman():
    # 雪だるまの部分
    base = create_sphere((0, 0, 1), (1, 1, 1))
    base.name = "Base"
    middle = create_sphere((0, 0, 2.5), (0.75, 0.75, 0.75))
    middle.name = "Middle"
    top = create_sphere((0, 0, 3.6), (0.6, 0.6, 0.6))
    top.name = "Top"

    # 顔の特徴
    eye_scale = (0.1, 0.1, 0.1)
    eye_distance = 0.2
    eye_height = 3.8

    left_eye = create_sphere((-eye_distance, 0.15, eye_height), eye_scale)
    left_eye.name = "Left Eye"

    right_eye = create_sphere((eye_distance, 0.15, eye_height), eye_scale)
    right_eye.name = "Right Eye"

    mouth_scale = (0.05, 0.05, 0.05)
    mouth_height = 3.65
    mouth_width = 0.25

    for i in range(-2, 3):
        angle = math.radians(i * 30)
        x = mouth_width * math.cos(angle)
        y = 0.15 + mouth_width * math.sin(angle)
        mouth_part = create_sphere((x, y, mouth_height), mouth_scale)
        mouth_part.name = f"Mouth Part {i+3}"

# シーンをクリアして雪だるまを作成
clear_scene()
create_snowman()
