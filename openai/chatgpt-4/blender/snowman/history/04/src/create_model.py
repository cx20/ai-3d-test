import bpy
import math

# 新規オブジェクトを作成し、指定された位置に配置する関数
def create_object(obj_type, obj_name, location):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=32, ring_count=16, radius=1)
    obj = bpy.context.active_object
    obj.name = obj_name
    obj.location = location
    return obj

# 新規シリンダーオブジェクトを作成し、指定された位置に配置する関数
def create_cylinder(obj_name, location, rotation, scale):
    bpy.ops.mesh.primitive_cylinder_add(vertices=32, radius=1, depth=2, end_fill_type='NGON')
    obj = bpy.context.active_object
    obj.name = obj_name
    obj.location = location
    obj.rotation_euler = rotation
    obj.scale = scale
    return obj

# すべてのオブジェクトを削除
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False, confirm=False)

# 雪だるまの体を作成
body = create_object('MESH', 'body', (0, 0, 1))
body.scale = (1, 1, 1)

middle = create_object('MESH', 'middle', (0, 0, 2.5))
middle.scale = (0.7, 0.7, 0.7)

head = create_object('MESH', 'head', (0, 0, 3.7))
head.scale = (0.5, 0.5, 0.5)

# 雪だるまの顔を作成
left_eye = create_object('MESH', 'left_eye', (-0.15, 0.3, 3.8))
left_eye.scale = (0.05, 0.05, 0.05)

right_eye = create_object('MESH', 'right_eye', (0.15, 0.3, 3.8))
right_eye.scale = (0.05, 0.05, 0.05)

nose = create_object('MESH', 'nose', (0, 0.45, 3.75))
nose.scale = (0.05, 0.05, 0.05)

# 雪だるまのアームを作成
left_arm = create_cylinder('left_arm', (-0.8, 0, 2.7), (0, math.pi/8, math.pi/2), (0.05, 0.05, 0.5))
right_arm = create_cylinder('right_arm', (0.8, 0, 2.7), (0, -math.pi/8, -math.pi/2), (0.05, 0.05, 0.5))
