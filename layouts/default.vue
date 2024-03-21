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
                    <el-col :span="2">这里是标题栏</el-col>
                    <el-col :span="2"></el-col>
                    <el-col :span="2">以后可以放一些快捷工具和登录</el-col>
                    <el-col :span="16"></el-col>
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
                    >
                        <template #breadcrumb>
                            <el-breadcrumb separator="/">
                            
                                <template v-for="item in layout_store.path">
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
                                <span class="text-large font-600 mr-3">{{ layout_store.title }}</span>
                                <span
                                    class="text-sm mr-2"
                                    style="color: var(--el-text-color-regular)"
                                    v-if="'subtitle' in layout_store"
                                >{{ layout_store.subtitle }}</span>
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

import { useLayoutStore } from '../store/layout'

const layout_store = useLayoutStore()

</script>