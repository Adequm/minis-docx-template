<template>
	<div>
		<a 
			v-if="isDesktop && arrowLeft" 
			:href="arrowLeft.link"
			class="arrow arrow-left">
			<Icon type="angle-double-small-left" :size="100"/>
			<span v-text="mainName + ':'"/>
			<span v-text="arrowLeft.title"/>
		</a>

		<slot/>

		<a 
			v-if="isDesktop && arrowRight" 
			:href="arrowRight.link"
			class="arrow arrow-right">
			<Icon type="angle-double-small-right" :size="100"/>
			<span v-text="mainName + ':'"/>
			<span v-text="arrowRight.title"/>
		</a>
	</div>
</template>

<script>
import _ from 'lodash';

import Icon from './Icon';
import translateMixin from '../../mixins/translate.mixin';

export default {
	name: 'SwitchArrowsProjects',

	mixins: [translateMixin],

	components: {
		Icon,
	},

	props: {
		minisJSON: Object,
		isDesktop: Boolean,
	},

	data: () => ({
		mainName: null,
		arrowLeft: null,
		arrowRight: null,
	}),

	watch: {
		minisLang: {
			immediate: true,
			handler() {
				this.mainName = this.translateChain('home.title')();

				this.arrowLeft = {
					key: this.prevProjectKey,
					title: this.translateChain(this.prevProjectKey)('title')(),
					link: `https://adequm.github.io/minis-${ this.prevProjectKey }`,
				};

				this.arrowRight = {
					key: this.nextProjectKey,
					title: this.translateChain(this.nextProjectKey)('title')(),
					link: `https://adequm.github.io/minis-${ this.nextProjectKey }`,
				};
			},
		},
	},

	computed: {
		minisList: ths => _.keys(ths.minisJSON).filter(m => m !== 'home'),
		projectIndex: ths => _.indexOf(ths.minisList, ths.projectKey),
		prevProjectIndex: ths => (ths.projectIndex - 1 + _.size(ths.minisList)) % _.size(ths.minisList),
		nextProjectIndex: ths => (ths.projectIndex + 1) % _.size(ths.minisList),
		prevProjectKey: ths => _.get(ths.minisList, ths.prevProjectIndex),
		nextProjectKey: ths => _.get(ths.minisList, ths.nextProjectIndex),
	},
};
</script>

<style lang="scss" scoped>
.arrow {
	position: absolute;
	top: calc(50% - 50px);
	color: #0000001a;
	transition: color .2s; 
	display: flex;
  flex-direction: column;
  align-items: center;
	cursor: pointer;
  font-weight: bold;
  font-size: 12px;
  width: 100px;

	&-left {
		right: calc(100% + 90px);
	}

	&-right {
		left: calc(100% + 90px);
	}

	&::after {
		content: "";
		position: absolute;
		height: inherit;
		width: inherit;
	}

	&:hover {
		color: var(--special-color);
	}

	.icon {
		height: calc(100px - 2em) !important;
		width: calc(100px - 2em) !important;
	}
}
</style>