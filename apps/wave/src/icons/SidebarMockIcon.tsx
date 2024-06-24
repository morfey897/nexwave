const SidebarMockIcon = (props: React.SVGProps<SVGSVGElement>) => (
	<svg
		width={props.width || '42'}
		height={props.height || '42'}
		viewBox='0 0 42 42'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<rect width='42' height='42' rx='8' fill={'var(--user-selected)'} />
		<path
			d='M12.1946 27V15.3636H16.6491C17.4901 15.3636 18.1889 15.4962 18.7457 15.7614C19.3063 16.0227 19.7249 16.3807 20.0014 16.8352C20.2817 17.2898 20.4219 17.8049 20.4219 18.3807C20.4219 18.8542 20.331 19.2595 20.1491 19.5966C19.9673 19.9299 19.723 20.2008 19.4162 20.4091C19.1094 20.6174 18.7666 20.767 18.3878 20.858V20.9716C18.8007 20.9943 19.1965 21.1212 19.5753 21.3523C19.9579 21.5795 20.2704 21.9015 20.5128 22.3182C20.7552 22.7348 20.8764 23.2386 20.8764 23.8295C20.8764 24.4318 20.7306 24.9735 20.4389 25.4545C20.1473 25.9318 19.7079 26.3087 19.1207 26.5852C18.5336 26.8617 17.795 27 16.9048 27H12.1946ZM14.3026 25.2386H16.5696C17.3348 25.2386 17.8859 25.0928 18.223 24.8011C18.5639 24.5057 18.7344 24.1269 18.7344 23.6648C18.7344 23.3201 18.6491 23.0095 18.4787 22.733C18.3082 22.4527 18.0658 22.233 17.7514 22.0739C17.437 21.911 17.062 21.8295 16.6264 21.8295H14.3026V25.2386ZM14.3026 20.3125H16.3878C16.7514 20.3125 17.0791 20.2462 17.3707 20.1136C17.6624 19.9773 17.8916 19.786 18.0582 19.5398C18.2287 19.2898 18.3139 18.9943 18.3139 18.6534C18.3139 18.2027 18.1548 17.8314 17.8366 17.5398C17.5223 17.2481 17.0545 17.1023 16.4332 17.1023H14.3026V20.3125ZM29.0341 18.5625C28.9811 18.0663 28.7576 17.6799 28.3636 17.4034C27.9735 17.1269 27.4659 16.9886 26.8409 16.9886C26.4015 16.9886 26.0246 17.0549 25.7102 17.1875C25.3958 17.3201 25.1553 17.5 24.9886 17.7273C24.822 17.9545 24.7367 18.214 24.733 18.5057C24.733 18.7481 24.7879 18.9583 24.8977 19.1364C25.0114 19.3144 25.1648 19.4659 25.358 19.5909C25.5511 19.7121 25.7652 19.8144 26 19.8977C26.2348 19.9811 26.4716 20.0511 26.7102 20.108L27.8011 20.3807C28.2405 20.483 28.6629 20.6212 29.0682 20.7955C29.4773 20.9697 29.8428 21.1894 30.1648 21.4545C30.4905 21.7197 30.7481 22.0398 30.9375 22.4148C31.1269 22.7898 31.2216 23.2292 31.2216 23.733C31.2216 24.4148 31.0473 25.0152 30.6989 25.5341C30.3504 26.0492 29.8466 26.4527 29.1875 26.7443C28.5322 27.0322 27.7386 27.1761 26.8068 27.1761C25.9015 27.1761 25.1155 27.036 24.4489 26.7557C23.786 26.4754 23.267 26.0663 22.892 25.5284C22.5208 24.9905 22.3201 24.3352 22.2898 23.5625H24.3636C24.3939 23.9678 24.5189 24.3049 24.7386 24.5739C24.9583 24.8428 25.2443 25.0436 25.5966 25.1761C25.9527 25.3087 26.3504 25.375 26.7898 25.375C27.2481 25.375 27.6496 25.3068 27.9943 25.1705C28.3428 25.0303 28.6155 24.8371 28.8125 24.5909C29.0095 24.3409 29.1098 24.0492 29.1136 23.7159C29.1098 23.4129 29.0208 23.1629 28.8466 22.9659C28.6723 22.7652 28.428 22.5985 28.1136 22.4659C27.803 22.3295 27.4394 22.2083 27.0227 22.1023L25.6989 21.7614C24.7405 21.5152 23.983 21.142 23.4261 20.642C22.8731 20.1383 22.5966 19.4697 22.5966 18.6364C22.5966 17.9508 22.7822 17.3504 23.1534 16.8352C23.5284 16.3201 24.0379 15.9205 24.6818 15.6364C25.3258 15.3485 26.0549 15.2045 26.8693 15.2045C27.6951 15.2045 28.4186 15.3485 29.0398 15.6364C29.6648 15.9205 30.1553 16.3163 30.5114 16.8239C30.8674 17.3277 31.0511 17.9072 31.0625 18.5625H29.0341Z'
			fill='var(--white)'
		/>
	</svg>
);

export default SidebarMockIcon;
