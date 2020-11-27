<template>
	<scroll-view ref='topBody' class="top-body" scroll-x="true" @scroll="scroll">
		<view id='topBody2' class="top-body2">
			<template v-for="item,index in mountList">
				<view class="col-data">
					<view :id="index" :class="item.id == selected ? 'active' : 'unActive'" class="top" :key="item.id" @click="clickMouthBut(item)">
						{{item.title}}
					</view>
				</view>

			</template>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		data() {
			var data = [{
				id: 1,
				title: '一月'
			}, {
				id: 2,
				title: '二月'
			}, {
				id: 3,
				title: '三月'
			}, {
				id: 4,
				title: '四月'
			}, {
				id: 5,
				title: '五月'
			}, {
				id: 6,
				title: '六月'
			}, {
				id: 7,
				title: '七月'
			}, {
				id: 8,
				title: '八月'
			}, {
				id: 9,
				title: '九月'
			}, {
				id: 10,
				title: '十月'
			}, {
				id: 11,
				title: '十一月'
			}, {
				id: 12,
				title: '十二月'
			}]

			return {
				mountList: data,
				selected: 1
			};
		},
		methods: {
			clickMouthBut: function(item) {
				this.selected = item.id;
				/* 将选中月份发送给父级 */
				this.$emit('fromUMouthTopValue', item);

				const query = uni.createSelectorQuery().in(this)
				query
					.selectAll('.top-body2')
					.boundingClientRect(rect => {
						this.scrollLeft = 200
					}).exec()

			},
			fromParentValue: function(value) {
				this.selected = value;
			},


		},
		computed: {

		},


	}
</script>

<style>
	.top-body {
		width: 100%;
		height: 50px;
		position: fixed;
		z-index: 999;
		top: 0px;
		/* left: 3%; */
		background: white;
		//   border: 1px solid black;
		overflow: hidden;
	}

	.top-body2 {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		overflow-x: scroll;
	}

	.top-body2::-webkit-scrollbar {
		display: none;
	}

	.active {
		background-color: #495ed1;
		color: #FFFFFF;
	}

	.unActive {
		background-color: #dddddd;
		color: #3c3c3c;
	}

	.top {
		/* position: relative; */
		width: 60px;
		height: 30px;
		border-radius: 50px;
		font-size: 12px;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 10px;
		margin-left: 10px;
		margin-right: 10px;

	}

	.col-data {
		width: 85px;
		height: 50px;
	}
</style>
