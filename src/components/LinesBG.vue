<script>
export default {
    name: 'LinesBG',
};
</script>

<template>
    <lines>
        <line :style="{ '--color': `#937650` }"></line>
        <line :style="{ '--color': `#f9bd6d` }"></line>
        <line :style="{ '--color': `#e6842b` }"></line>
        <line :style="{ '--color': `#ce572c` }"></line>
        <line :style="{ '--color': `#807c4c` }"></line>
        <line :style="{ '--color': `#8c9169` }"></line>
    </lines>
</template>

<style lang="scss" scoped>
lines {
    position: absolute;
    top: 0;
    left: 0;

    display: flex;
    overflow: hidden;

    width: 100vw;
    height: 100vh;

    justify-content: center;

    line {
        position: relative;

        display: block;

        width: 50px;
        height: 100%;
        margin-left: 10px;



        &::before {
            position: absolute;
            top: 0;
            left: 0;

            width: 100%;
            height: 57%;

            content: '';

            background: var(--color);

            backface-visibility: hidden;
            transform-style: preserve-3d;
        }

        &::after {
            position: absolute;
            bottom: 0;
            left: 0;

            display: block;

            width: 50px;
            height: 100%;

            content: '';

            background: var(--color);

            backface-visibility: hidden;
            transform-style: preserve-3d;
        }

        &:nth-child(1) {
            &::after {
                bottom: -346px;
                left: -44px;

                width: 66px;
                height: 100%;

                transform: perspective(1330px) rotateX(50deg) skew(-5deg);
            }
        }

        &:nth-child(2) {
            &::after {
                bottom: -346px;
                left: -22px;

                width: 66px;
                height: 100%;

                transform: perspective(1330px) rotateX(50deg) skew(-2deg);
            }
        }

        &:nth-child(3) {
            &::after {
                bottom: -346px;
                left: -7px;

                width: 66px;
                height: 100%;

                transform: perspective(1330px) rotateX(50deg) skew(0);
            }
        }

        &:nth-child(4) {
            &::after {
                bottom: -346px;
                left: 7px;

                width: 66px;
                height: 100%;

                transform: perspective(1330px) rotateX(50deg) skew(2deg);
            }
        }

        &:nth-child(5) {
            &::after {
                bottom: -346px;
                left: 29px;

                width: 66px;
                height: 100%;

                transform: perspective(1330px) rotateX(50deg) skew(5deg);
            }
        }

        &:nth-child(6) {
            &::after {
                bottom: -346px;
                left: 52px;

                width: 66px;
                height: 100%;

                transform: perspective(1330px) rotateX(50deg) skew(8deg);
            }
        }
    }

    bend {
        display: block;

        width: 50px;
        height: 50%;
        margin-left: 10px;

        background: var(--color);

        &:first-child {
            margin-left: 0;
        }
    }
}
</style>
