<template lang="pug">
Card(style="display: flex;")
    p.title.inline-block.no-margin(style="margin-right: 0.5em;") {{ title }}
    el-button(v-if="!has_attended", size="small", @click="handleAttendContest") 参加
    el-button(v-else, disabled, size="small") 已参加
    router-link(custom, v-slot="{ navigate }", :to="`/contest/${$route.params.contest_id}/edit`")
        FontAwesomeIcon(icon="wrench", @click="navigate").edit
Card.detail
    el-tabs
        el-tab-pane(label="比赛简介")
            MarkdownView(:content="content")
        el-tab-pane(label="试题列表")
            DataGrid(:data="problem_detail", :pageSelector="false")
                template(v-slot:head)
                    th(style="width: 3em;") 状态
                    th(style="width: 5em; text-align: left;") 题号
                    th(style="text-align: left;") 题目名称
                    th(style="width: 5em;") 得分
                template(v-slot:body="{ item, index }")
                    td(style="text-align: center;") -
                    td {{ item.problem_id }}
                    td: router-link(:to="`/problem/${item.problem_id}`") {{ item.title }}
                    td(style="text-align: center;") 0
        el-tab-pane(label="比赛排名")
</template>

<script>
import Card from '../components/Card.vue';
import Tag from '../components/Tag.vue';
import Button from '../components/Button.vue';
import MarkdownView from '../components/MarkdownView.vue';
import MonacoEditor from '../components/MonacoEditor.vue';
import DataGrid from '../components/DataGrid.vue';
import config from '../config';
import axios from 'axios';

export default {
    name: 'Contest',
    components: {
        Card,
        Tag,
        Button,
        MarkdownView,
        MonacoEditor,
        DataGrid
    },
    data: function () {
        return {
            title: '',
            content: '',
            mode: 0,
            start_time: 0,
            end_time: 0,
            problem: [],
            problem_detail: [],
            has_attended: false
        };
    },
    created: async function () {
        await axios.get(`${config.apiServer}/contest/detail`, {
            params: {
                contest_id: this.$route.params.contest_id
            }
        }).then(res => {
            if (res.status === 200) {
                this.title = res.data.data.title;
                this.start_time = res.data.data.start_time;
                this.end_time = res.data.data.end_time;
                this.content = res.data.data.content;
                this.problem = res.data.data.problem;
                this.problem_detail = res.data.data.problem_detail;
            }
        });
    },
    methods: {
        handleAttendContest: function () {
            this.has_attended = true;
        }
    }
};
</script>

<style scoped>
@import '~@/static/article.css';

.sample-text {
    display: flex;
}

.sample-text > pre {
    flex: 1;
    font-size: 120%;
    border: solid 1px;
    border-radius: 0.3em;
    padding: 0.5em;
    margin: 0em;
}

.editor {
    text-align: initial;
    height: 500px;
    border: solid 1px #efefef;
}

.edit {
    position: absolute;
    right: 0.7em;
    top: 0.7em;
    transition-duration: 0.3s;
}

.edit:hover {
    color: #686868;
}

.tag-difficulty-0 {
    background-color: #bfbfbf !important;
}

.tag-difficulty-1 {
    background-color: #fe4c61 !important;
}

.tag-difficulty-2 {
    background-color: #f39c11 !important;
}

.tag-difficulty-3 {
    background-color: #ffc116 !important;
}

.tag-difficulty-4 {
    background-color: #52c41a !important;
}

.tag-difficulty-5 {
    background-color: #3498db !important;
}

.tag-difficulty-6 {
    background-color: #9d3dcf !important;
}

.tag-difficulty-7 {
    background-color: #0e1d69 !important;
}
</style>