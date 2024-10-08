<template>
  <div class="common-layout">
    <el-container>
      <el-header
        style="
          /* background-color: aquamarine; */
          border-bottom: 1px solid #ddd;
        "
      >
        <el-row
          align="middle"
          style="height: 100%"
        >
          <el-col :span="2"></el-col>
          <el-col :span="8">🌴管理后台🌴</el-col>
          <el-col :span="6"></el-col>
          <template v-if="user_store.logined">
            <el-col :span="4">
              <el-text>{{ user_store.username }}</el-text>
            </el-col>
            <el-col :span="1"></el-col>
            <el-col :span="3">
              <el-button type="danger" plain @click="logout">登出</el-button>
            </el-col>
          </template>
          <template v-else>
            <el-col :span="8">
              <el-button type="primary" plain @click="login">登录</el-button>
            </el-col>
          </template>
        </el-row>
      </el-header>
      <el-main
        style="
          display: flex;
          justify-content: center;
          align-items: center;
        "
      >
        <div
          style="
            border: 1px solid #ddd;
            margin: 20px;
            padding: 20px;
            min-width: 50%;
          "
        >
          <el-page-header
            @back="goBack"
          >
            <template #breadcrumb>
              <el-breadcrumb separator="/">
              
                <template v-for="item in page_info.path">
                  <el-breadcrumb-item v-if="'path' in item" :to="{ path: item.path }">
                    {{ item.name }}
                  </el-breadcrumb-item>
                
                  <el-breadcrumb-item v-else>
                    {{ item.name }}
                  </el-breadcrumb-item>
                </template>
              
              </el-breadcrumb>
            </template>
          
            <template #content>
              <div class="flex items-center">
                <span class="text-large font-600 mr-3">{{ page_info.title }}</span>
                <span
                  class="text-sm mr-2"
                  style="color: var(--el-text-color-regular)"
                  v-if="'subtitle' in page_info"
                >{{ page_info.subtitle }}</span>
              </div>
            </template>
          
          </el-page-header>
          <br />
          <slot />
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { pageInfoMapper } from '~/util/route';

const user_store = useUserStore()
const router = useRouter()

const page_info = computed(() => {
  return pageInfoMapper[router.currentRoute.value.fullPath]
})

function goBack() {
  // router.push('/')
  window.location.href = '/'
}

function login() {
  router.push('/user/login')
}

function logout() {
  user_store.logout()
  router.push('/user/login')
}

</script>