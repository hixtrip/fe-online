<template>
  <div>
    <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      default-active="2"
      text-color="#fff"
      v-loading="loading"
      style="min-height: 500px"
      @select="menuSelect"
    >
      <div class="department">
        <div>部门</div>
        <el-icon style="cursor: pointer" @click="dialogTableVisible = true"
          ><Plus
        /></el-icon>
      </div>
      <template v-if="list.length > 0">
        <el-sub-menu v-for="(item, index) in list" :index="index.toString()">
          <template #title>
            <el-icon><Operation /></el-icon>
            <span>{{ item.title }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              v-for="(it, id) in item.datas"
              :key="it.id"
              :index="index.toString() + '-' + id.toString()"
            >
              {{ it.name }}
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
      </template>
      <el-empty v-else description="暂无数据" />
    </el-menu>
    <!-- 新增子部门弹窗 -->
    <el-dialog v-model="dialogTableVisible" title="新增子部门" width="800">
      <el-form
        ref="ruleFormRef"
        style="width: 100%"
        :model="ruleForm"
        :rules="rules"
        label-width="auto"
        status-icon
      >
        <el-form-item label="所属公司" prop="parentId">
          <el-select
            v-model="ruleForm.parentId"
            placeholder="请选择所属公司"
            style="width: 500px; margin-right: 20px"
          >
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            />
          </el-select>
          <el-button type="primary" @click="dialogTableVisibleSec = true"
            >新增公司</el-button
          >
        </el-form-item>
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
      </el-form>
      <el-button
        type="primary"
        style="display: block; margin: 0 auto"
        @click="sure"
        :loading="btnLoading"
        >确定</el-button
      >
    </el-dialog>
    <!-- 新增公司 -->
    <el-dialog v-model="dialogTableVisibleSec" title="新增公司" width="800">
      <el-form
        ref="ruleFormRefSec"
        style="width: 100%"
        :model="ruleFormSec"
        :rules="rulesSec"
        label-width="auto"
        status-icon
      >
        <el-form-item label="公司名称" prop="title">
          <el-input v-model="ruleFormSec.title" />
        </el-form-item>
      </el-form>
      <el-button
        type="primary"
        style="display: block; margin: 0 auto"
        @click="sureSec"
        :loading="btnSecLoading"
        >确定</el-button
      >
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { orgApi, setCompany, setChildDepartment } from "../api/org";
import { FormInstance, FormRules } from "element-plus";
import { recordTabSelect } from "../store";
interface RuleForm {
  parentId: string;
  name: string;
}
interface RuleFormSec {
  title: String;
}
const recordTabSelectStore = recordTabSelect();
const loading = ref(false);
const list = ref([]);
const dialogTableVisible = ref(false);
const btnLoading = ref(false);
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<RuleForm>({
  parentId: "",
  name: "",
});
const rules = reactive<FormRules<RuleForm>>({
  parentId: [{ required: true, message: "请选择所属公司", trigger: "blur" }],
  name: [{ required: true, message: "请输入部门名称", trigger: "blur" }],
});

const dialogTableVisibleSec = ref(false);
const btnSecLoading = ref(false);
const ruleFormRefSec = ref<FormInstance>();
const ruleFormSec = reactive<RuleFormSec>({
  title: "",
});
const rulesSec = reactive<FormRules<RuleFormSec>>({
  title: [{ required: true, message: "请输入公司名称", trigger: "blur" }],
});
function menuSelect(e) {
  recordTabSelectStore.set(e);
}
//请求部门列表接口
async function refresh() {
  loading.value = true;
  const data = await orgApi();
  loading.value = false;
  list.value = data;
}
async function sure() {
  if (!ruleFormRef.value) return;
  await ruleFormRef.value.validate(async (valid, fields) => {
    if (valid) {
      btnLoading.value = true;
      await setChildDepartment(ruleForm);
      btnLoading.value = false;
      dialogTableVisible.value = false;
      refresh();
    } else {
      console.log("error submit!", fields);
    }
  });
}
async function sureSec() {
  if (!ruleFormRefSec.value) return;
  await ruleFormRefSec.value.validate(async (valid, fields) => {
    if (valid) {
      btnSecLoading.value = true;
      await setCompany({ title: ruleFormSec.title });
      btnSecLoading.value = false;
      dialogTableVisibleSec.value = false;
      refresh();
    } else {
      console.log("error submit!", fields);
    }
  });
}
refresh();
</script>

<style>
.department {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 56px;
  color: white;
  padding: 0
    calc(
      var(--el-menu-base-level-padding) + var(--el-menu-level) *
        var(--el-menu-level-padding)
    );
}
</style>
