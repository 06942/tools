<template>
    <div class="title"><h1>Ξ</h1></div>
    <div class="container">
    <div class="text-wrapper">
        <textarea placeholder="Input..." v-model="origin"></textarea>
        <textarea :class="{error: isError}" ref="resultInput" :value="result" disabled></textarea>
    </div>
    <div class="copy-box"><button class="copy" @click="copyAction" v-if="showCopy">{{ copyTitle }}</button></div>
    <div class="control">
        <button id="u2hButton" class="action-button" :class="{active: u2h}" @click="convertAction">UTF8 to HEX</button>
        <button class="action-button" :class="{active: !u2h}" @click="convertAction">HEX to UTF8</button>
    </div>
  </div>
</template>

<script>
    import { computed,  ref, watch } from 'vue'
    import { Buffer } from 'buffer'
    export default {
        name: 'H2DView',
        setup() {
            let u2h = ref(true)
            let origin = ref('')
            let result = ref('')
            let copyTitle = ref('Copy')
            let isError = ref(false)

            let u2hAction = function() {
                u2h.value = true
            }

            let h2uAction = function() {
                u2h.value = false
            }

            let _showCopy = computed(() => {
                if (result.value && isError.value == false) {
                    return true
                } else {
                    return false
                }
            })

            let showCopy = ref(_showCopy)

            let convertAction = function(event) {
                isError.value = false
                if (event && event.srcElement) {
                    u2h.value = event.srcElement.id === 'u2hButton'
                }
                
                let content = origin.value.trim()                
                if (content.length > 0) {
                    if (u2h.value === true) {
                        result.value = `0x${Buffer.from(content, 'utf8').toString('hex')}`
                    } else {
                        result.value = hexToString(content)
                    }                    
                } else {
                    result.value = ''
                }            
            }

            function hexToString(data) {
                var hex = data.toLowerCase()
                if (hex.startsWith('0x')) {
                    hex = hex.slice(2)
                }
                try {
                    let message = decodeURIComponent(
                        hex.replace(/\s+/g, '') // remove spaces
                        .replace(/[0-9a-f]{2}/g, '%$&') // add '%' before each 2 characters
                    )
                    return message
                } catch (error) {
                    isError.value = true
                    return error.message
                }
            }

            let copyAction = function() {
                navigator.clipboard.writeText(result.value)
                copyTitle.value = 'Copied'
                setTimeout(() => {
                    copyTitle.value = 'Copy'
                }, 2000);
            }
           
            watch(origin, (newValue, oldValue) => {
                if (newValue != oldValue) {
                    convertAction()
                }
            })

            return {
                u2h,
                origin,
                result,
                u2hAction,
                h2uAction,
                convertAction,
                showCopy,
                copyAction,
                copyTitle,
                isError
            }
        }
    }
</script>

<style>

    .title {
        font-size: 30px;
        color: white;
        margin: 150px auto 0 auto;
        text-align: center;
    }

    .container {
        width: 800px;
        margin: 100px auto;
        border: 1px solid rgb(240, 241, 255);
        background-color: rgb(28, 29, 33);
        border-radius: 10px;        
        box-shadow: 0 0 30px rgb(240, 241, 255, 0.8);
        overflow: hidden;
    }

    .text-wrapper {
        display: flex;
    }

    .text-wrapper textarea {
        padding: 5px;
        width: 50%;
        height: 400px;
        resize: none;
        font-size: 16px;
        border: none;
    }

    .text-wrapper textarea:focus { 
        outline: none;
        border: none;
     }
     .text-wrapper textarea:disabled {
        background-color: white;
     }

     .text-wrapper textarea:first-child {
        border-right: 1px solid rgb(240, 241, 255);
     }

     .text-wrapper textarea:last-child {
        border-left: 1px solid rgb(240, 241, 255);
     }

     .copy-box {
        text-align: right;
     } 

    .action-button {
        background-color: rgb(240, 241, 255);
        color: black;
        line-height: 40px;
        width: 240px;
        margin: 20px auto;
        border: 1px solid rgb(240, 241, 255);
        border-radius: 5px;        
        box-shadow: 0 0 5px rgb(240, 241, 255, 0.8);
        display: flex;
        justify-content: center
    }

    .action-button:hover {
        cursor: pointer;
        background-color: black;
        color: white;
    }

    .active {
        background-color: black;
        color: white;
    }
    .error {
        color: red;
    }

</style>