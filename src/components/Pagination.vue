<template>
	<nav>
		<span v-for="(page, i) in pages" :key="i" :class="{item: true, active: i === value}" @click="$emit('input', i)">
			<span class="left">{{ page[0] }}</span>
			<span class="right" v-if="page[1]">{{ page[1] }}</span>
		</span>
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
					pages.push([i, (i < this.total ? i + 1 : '+')]);
				}
				if (this.total % 2 === 0) {
					pages.push(['+']);
				}
				return pages;
			},
		},
	};
</script>

<style scoped>
	nav {
		margin: 1em 0;
		text-align: center;
		user-select: none;
	}
	.item {
		display: inline-flex;
		margin: 0 2px;
		padding: 4px;
		color: #ccc;
		background: white;
		border: 1px solid #ccc;
		border-radius: 2px;
		cursor: pointer;
	}
	.item.active {
		color: #666;
		border-color: #999;
	}
	.left {
		padding: 2px 8px;
	}
	.right {
		padding: 2px 8px;
		border-left: 1px solid #ccc;
	}
</style>