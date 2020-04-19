<template>
	<nav>
		<span v-for="(page, i) in pages" :key="i" :class="{item: page.value > -1, active: page.value === value}" @click="page.value > -1 && $emit('input', page.value)">
			<span class="left">{{ page.left }}</span>
			<span class="right" v-if="page.right">{{ page.right }}</span>
		</span>
	</nav>
</template>

<script>
	export default {
		props: [
			'total',
			'value',
			'near',
		],
		computed: {
			pages() {
				const pages = [];
				const last = this.total + this.total % 2 - 2;

				for (let i = 0; i <= last; i += 2) {
					if (i === 2 && this.value - this.near > 2) {
						pages.push({
							left: '...',
						});
					}

					if (i === 0 || i === last || (i >= this.value - this.near && i <= this.value + this.near + 1)) {
						pages.push({
							value: i,
							left: i + 1,
							right: (i < this.total - 1 ? i + 2 : '+'),
						});
					}

					if (i === last - 2 && this.value + this.near < last - 2) {
						pages.push({
							left: '...',
						});
					}
				}

				if (this.total % 2 === 0) {
					pages.push({
						value: this.total,
						left: '+',
					});
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