<template>
    <div class="bread">
        <div class="bread-wrap">
            <div>
                <a href="/">Home</a>
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
                     
        },
    }
</script>

<style scope>
    .bread {
        height: 45px;
        line-height: 45px;
        background-color: #f0f0f0;    
    }

    .bread-wrap {
        padding: 0 10px;
        font-size: 14px;
        max-width: 1280px;
        margin: 0 auto;
    }

    .bread-wrap a {
        color: #a1a1a1;
        position: relative;
        margin-right: 15px;
        text-decoration: none;
    }
    
    .bread-wrap a:hover {
        cursor: pointer;
        color: #d1434a;
    }

    .bread-wrap a:after {
        left: 45px;
        position: absolute;
        top: 0px;
        content: '/';
        height: 20px;
        line-height: 20px;
    }
    .bread-wrap span{
        color:#d1434a;
  }
</style>