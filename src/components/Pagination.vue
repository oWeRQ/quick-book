<template>
	<nav>
		<span v-for="(page, i) in pages" :key="i" :class="{active: i === value}" @click="$emit('input', i)">{{ page }}</span>
	</nav>
</template>

<script>
	export default {
		props: [
			'total',
			'value',
		],
		computed: {
			pages() {
				const pages = [];
				for (let i = 1; i <= this.total; i += 2) {
					pages.push(i + ' | ' + (i < this.total ? i + 1 : '+'));
				}
				if (this.total % 2 === 0) {
					pages.push('+');
				}
				return pages;
			},
		},
	};
</script>

<style scoped>
	nav {
		margin: 2em 0 1em;
		text-align: center;
		user-select: none;
	}
	nav > * {
		display: inline-block;
		margin: 0 2px;
		padding: 4px 8px;
		color: #ccc;
		background: white;
		border: 1px solid #ccc;
		border-radius: 2px;
		cursor: pointer;
	}
	nav > .active {
		color: #666;
		border-color: #999;
	}
</style>