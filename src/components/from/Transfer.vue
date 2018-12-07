<template>
    <el-row type="flex"  justify="center">
        <el-transfer
                filterable
                :filter-method="filterMethod"
                :button-texts="['移除', '添加']"
                :titles="['用户信息','已有用户信息']"
                filter-placeholder="请输入人名拼音"
                v-model="value2"
                :data="data2">
        </el-transfer>
    </el-row>


</template>

<script>
    export default {
        data() {
            const generateData2 = _ => {
                const data = [];
                const names = ['张三', '李四', '王五', '赵六', '钱七', '孙八', '吴十'];
                const pinyin = ['zhangsan', 'lisi', 'wangwu', 'zhaoliu', 'qianqi', 'sunba', 'wushi'];
                names.forEach((name, index) => {
                    data.push({
                        label: name,
                        key: index,
                        pinyin: pinyin[index]
                    });
                });
                return data;
            };
            return {
                data2: generateData2(),
                value2: [],
                filterMethod(query, item) {
                    return item.pinyin.indexOf(query) > -1;
                }
            };
        }
    };
</script>
