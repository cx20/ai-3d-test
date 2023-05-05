import bpy
import math

def create_snowman(name, location):
    # 雪だるまのボディを作成
    bpy.ops.mesh.primitive_uv_sphere_add(location=location)
    body = bpy.context.active_object
    body.name = name + '_body'
    body.scale = (1.0, 1.0, 1.2)

    # 雪だるまの頭を作成
    head_location = (location[0], location[1], location[2] + 2.5)
    bpy.ops.mesh.primitive_uv_sphere_add(location=head_location)
    head = bpy.context.active_object
    head.name = name + '_head'
    head.scale = (0.6, 0.6, 0.7)

    # 目を作成
    eye_offset = 0.2
    eye_scale = (0.1, 0.1, 0.1)
    left_eye_location = (head_location[0] - eye_offset, head_location[1] + eye_offset, head_location[2] + eye_offset)
    right_eye_location = (head_location[0] + eye_offset, head_location[1] + eye_offset, head_location[2] + eye_offset)

    bpy.ops.mesh.primitive_uv_sphere_add(location=left_eye_location)
    left_eye = bpy.context.active_object
    left_eye.name = name + '_left_eye'
    left_eye.scale = eye_scale

    bpy.ops.mesh.primitive_uv_sphere_add(location=right_eye_location)
    right_eye = bpy.context.active_object
    right_eye.name = name + '_right_eye'
    right_eye.scale = eye_scale

    # 鼻を作成
    nose_location = (head_location[0], head_location[1] + 0.6, head_location[2])
    bpy.ops.mesh.primitive_cone_add(vertices=4, radius1=0.05, depth=0.4, location=nose_location, rotation=(0, math.radians(90), 0))
    nose = bpy.context.active_object
    nose.name = name + '_nose'

    # 雪だるまの親オブジェクトを作成
    snowman_parent = bpy.data.objects.new(name, None)
    bpy.context.collection.objects.link(snowman_parent)

    # すべてのパーツに親オブジェクトを設定
    body.parent = snowman_parent
    head.parent = snowman_parent
    left_eye.parent = snowman_parent
    right_eye.parent = snowman_parent
    nose.parent = snowman_parent

    return snowman_parent

# 雪だるまを作成
create_snowman('snowman', (0, 0, 1))
