import bpy

def create_snowman():
    # 雪だるまの基本パーツを作成する関数
    def create_snowball(radius, location):
        bpy.ops.mesh.primitive_uv_sphere_add(radius=radius, location=location)
        snowball = bpy.context.active_object
        snowball.name = "Snowball"
        snowball.data.name = "Snowball"
        return snowball

    # それぞれの雪玉の半径と位置
    base_radius = 1.0
    middle_radius = 0.6
    head_radius = 0.4

    base_location = (0, 0, base_radius)
    middle_location = (0, 0, base_radius * 2 + middle_radius)
    head_location = (0, 0, base_radius * 2 + middle_radius * 2 + head_radius)

    # 雪だるまの基本パーツを作成
    base = create_snowball(base_radius, base_location)
    middle = create_snowball(middle_radius, middle_location)
    head = create_snowball(head_radius, head_location)

    # マテリアルを作成して、雪玉に適用
    snow_material = bpy.data.materials.new(name="Snow")
    snow_material.diffuse_color = (0.9, 0.9, 0.9, 1.0)
    
    for snowball in [base, middle, head]:
        snowball.data.materials.append(snow_material)

# すべてのオブジェクトを削除してシーンをクリア
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete()

# 雪だるまを作成
create_snowman()
