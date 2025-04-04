import { ReactElement, SVGAttributes } from 'react';

export type IconName =
	| 'alert'
	| 'edit'
	| 'menu'
	| 'settings'
	| 'user'
	| 'participants'
	| 'map'
	| 'chat'
	| 'whatsapp'
	| 'qr'
	| 'location'
	| 'flag'
	| 'target'
	| 'circle'
	| 'exit'
	| 'clipboard'
	| 'trivia'
	| 'share'
	| 'spinner'
	| 'info'
	| 'threeDots'
	| 'vIcon'
	| 'xIcon'
	| 'logout';

interface IIconProps {
	fill?: SVGAttributes<SVGSVGElement>['fill'];
	size?: string;
	name: IconName;
	className?: string;
	notificationCount?: number;
}

export default function Icon({
	fill = '#000',
	size = '25',
	name,
	notificationCount,
	className = '',
}: IIconProps) {
	const icons: Record<IconName, ReactElement<SVGSVGElement>> = {
		info: (
			<svg
				width={size}
				height={size}
				className={`${className}`}
				fill={fill}
				viewBox='0 0 550 550'
			>
				<path d='M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z' />
			</svg>
		),
		alert: (
			<svg
				width={size}
				height={size}
				className={`${className}`}
				xmlns='http://www.w3.org/2000/svg'
				fill={fill}
				viewBox='0 0 512 512'
			>
				<path d='M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480L40 480c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24l0 112c0 13.3 10.7 24 24 24s24-10.7 24-24l0-112c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z' />
			</svg>
		),
		edit: (
			<svg
				width={size}
				height={size}
				className={`${className}`}
				xmlns='http://www.w3.org/2000/svg'
				fill={fill}
				viewBox='0 0 512 512'
			>
				<path d='M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z' />
			</svg>
		),
		menu: (
			<svg
				width={size}
				height={size}
				className={`${className}`}
				xmlns='http://www.w3.org/2000/svg'
				fill={fill}
				viewBox='0 0 448 512'
			>
				<path d='M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z' />
			</svg>
		),
		settings: (
			<svg
				width={size}
				height={size}
				className={`${className}`}
				xmlns='http://www.w3.org/2000/svg'
				fill={fill}
				viewBox='0 0 512 512'
			>
				<path d='M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z' />
			</svg>
		),
		user: (
			<svg
				width={size}
				height={size}
				className={`${className}`}
				xmlns='http://www.w3.org/2000/svg'
				fill={fill}
				viewBox='0 0 448 512'
			>
				<path d='M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z' />
			</svg>
		),
		participants: (
			<svg
				width={size}
				height={size}
				className={`${className}`}
				fill={fill}
				viewBox='0 0 40 29'
				xmlns='http://www.w3.org/2000/svg'
			>
				<circle className='fill-primary' cx='20' cy='9' r='5' />
				<path
					className='fill-dark dark:fill-light'
					fillRule='evenodd'
					clipRule='evenodd'
					d='M14.9405 5.7738C14.9797 5.52161 15 5.26318 15 5C15 2.23858 12.7614 0 10 0C7.23858 0 5 2.23858 5 5C5 7.76142 7.23858 10 10 10C11.7035 10 13.2081 9.14808 14.1108 7.84704C14.2569 7.09656 14.5429 6.39606 14.9405 5.7738ZM25.8896 7.84764C25.7435 7.0967 25.4573 6.3958 25.0594 5.77324C25.0203 5.52124 25 5.26301 25 5.00005C25 2.23863 27.2386 4.88975e-05 30 4.88975e-05C32.7614 4.88975e-05 35 2.23863 35 5.00005C35 7.76147 32.7614 10 30 10C28.2967 10 26.7924 9.14837 25.8896 7.84764ZM14.3416 11.0002H5C2.23858 11.0002 0 13.2388 0 16.0002V22.0002C0 23.6571 1.34315 25.0002 3 25.0002H9.00013V20.0002C9.00013 16.6865 11.6864 14.0002 15.0001 14.0002H16.6825C15.609 13.2865 14.7785 12.2363 14.3416 11.0002ZM31.0001 25.0002V20.0002C31.0001 16.6865 28.3138 14.0002 25.0001 14.0002H23.3178C24.3913 13.2865 25.2217 12.2363 25.6587 11.0002H35C37.7614 11.0002 40 13.2388 40 16.0002V22.0002C40 23.6571 38.6569 25.0002 37 25.0002H31.0001Z'
				/>
				<path
					className='fill-primary'
					d='M10 20C10 17.2386 12.2386 15 15 15H25C27.7614 15 30 17.2386 30 20V26C30 27.6569 28.6569 29 27 29H13C11.3431 29 10 27.6569 10 26V20Z'
				/>
			</svg>
		),
		map: (
			<svg
				width={size}
				height={size}
				className={`${className}`}
				fill={fill}
				viewBox='0 0 48 45'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					className='fill-dark dark:fill-light'
					fillRule='evenodd'
					clipRule='evenodd'
					d='M13.5523 17.2826L3.5 23.0268L2.35441 30.0639L13.4999 24.0268L18.2703 24.4811C16.3485 22.2253 14.6828 19.7624 13.5523 17.2826ZM21.4651 27.8318C22.2987 28.6151 23.1493 29.3506 24 30.0268C25.1263 29.032 26.3048 27.9088 27.4648 26.6941L30.4999 25.5268L34.9999 29.0268L47.9814 44.4122L48 44.5268L36 39.0268L28.5182 42.4559L23.9999 37.5268L17.4999 27.5268L21.4651 27.8318ZM31.2293 22.2727C32.4498 20.6404 33.531 18.9385 34.3542 17.2291L39.0218 19.8963L34.4999 21.0268L31.2293 22.2727ZM0 44.5268L1.82114 33.3398L12.9999 27.5268L23.9999 43.5268L24.2242 44.424L24 44.5268L12.5 39.0268L0 44.5268ZM44.5 23.0268L47.0715 38.8229L34.9999 25.0268L42.7355 22.0185L44.5 23.0268Z'
				/>
				<path
					className='fill-primary'
					fillRule='evenodd'
					clipRule='evenodd'
					d='M23.9999 25.4551C28.3199 21.6151 33.5999 15.3971 33.5999 10.0951C33.5999 4.79318 29.3018 0.495117 23.9999 0.495117C18.698 0.495117 14.3999 4.79318 14.3999 10.0951C14.3999 15.3971 19.1999 21.6151 23.9999 25.4551ZM24 13.935C26.1207 13.935 27.84 12.2158 27.84 10.095C27.84 7.97421 26.1207 6.25499 24 6.25499C21.8792 6.25499 20.16 7.97421 20.16 10.095C20.16 12.2158 21.8792 13.935 24 13.935Z'
				/>
			</svg>
		),
		chat: (
			<svg
				width={size}
				height={size}
				className={`${className}`}
				fill={fill}
				viewBox='0 0 34 32'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					fillRule='evenodd'
					clipRule='evenodd'
					d='M0 5.337C0 2.38946 2.42443 0 5.41511 0H24.0457C27.0363 0 29.4608 2.38945 29.4608 5.337V16.3922C29.4608 19.3397 27.0363 21.7292 24.0457 21.7292H12.2574L8.57801 26.5575C7.66841 27.7511 5.74192 27.161 5.6791 25.6695L5.51314 21.7292H5.41511C2.42443 21.7292 0 19.3397 0 16.3922V5.337ZM6.63996 13.2154C7.95728 13.2154 9.02518 12.1629 9.02518 10.8646C9.02518 9.56628 7.95728 8.51378 6.63996 8.51378C5.32263 8.51378 4.25473 9.56628 4.25473 10.8646C4.25473 12.1629 5.32263 13.2154 6.63996 13.2154ZM17.1478 10.8646C17.1478 12.1629 16.0799 13.2154 14.7626 13.2154C13.4453 13.2154 12.3774 12.1629 12.3774 10.8646C12.3774 9.56628 13.4453 8.51378 14.7626 8.51378C16.0799 8.51378 17.1478 9.56628 17.1478 10.8646ZM22.8853 13.2154C24.2026 13.2154 25.2705 12.1629 25.2705 10.8646C25.2705 9.56628 24.2026 8.51378 22.8853 8.51378C21.568 8.51378 20.5001 9.56628 20.5001 10.8646C20.5001 12.1629 21.568 13.2154 22.8853 13.2154Z'
					className='fill-dark dark:fill-light'
				/>
				<path
					fillRule='evenodd'
					clipRule='evenodd'
					d='M9.42285 29.4127L9.4561 30.2022C9.51892 31.6938 11.4454 32.2839 12.355 31.0903L16.0344 26.262H27.8227C30.8133 26.262 33.2378 23.8725 33.2378 20.925V9.86975C33.2378 8.43192 32.6609 7.12689 31.7227 6.16724C31.7256 6.24082 31.7271 6.31476 31.7271 6.38904V18.0584C31.7271 21.1697 29.1783 23.6919 26.0343 23.6919H14.3528L10.4847 28.7885C10.2294 29.1248 9.84725 29.327 9.42285 29.4127Z'
					className='fill-primary'
				/>
			</svg>
		),
		whatsapp: (
			<svg
				width={size}
				height={size}
				className={`${className}`}
				xmlns='http://www.w3.org/2000/svg'
				fill={fill}
				viewBox='0 0 448 512'
			>
				<path d='M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z' />
			</svg>
		),
		qr: (
			<svg
				width={size}
				height={size}
				className={`${className}`}
				xmlns='http://www.w3.org/2000/svg'
				fill={fill}
				viewBox='0 0 448 512'
			>
				<path d='M0 80C0 53.5 21.5 32 48 32l96 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48L0 80zM64 96l0 64 64 0 0-64L64 96zM0 336c0-26.5 21.5-48 48-48l96 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48l0-96zm64 16l0 64 64 0 0-64-64 0zM304 32l96 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48l0-96c0-26.5 21.5-48 48-48zm80 64l-64 0 0 64 64 0 0-64zM256 304c0-8.8 7.2-16 16-16l64 0c8.8 0 16 7.2 16 16s7.2 16 16 16l32 0c8.8 0 16-7.2 16-16s7.2-16 16-16s16 7.2 16 16l0 96c0 8.8-7.2 16-16 16l-64 0c-8.8 0-16-7.2-16-16s-7.2-16-16-16s-16 7.2-16 16l0 64c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-160zM368 480a16 16 0 1 1 0-32 16 16 0 1 1 0 32zm64 0a16 16 0 1 1 0-32 16 16 0 1 1 0 32z' />
			</svg>
		),
		location: (
			<svg
				width={size}
				height={size}
				className={`${className}`}
				xmlns='http://www.w3.org/2000/svg'
				fill={fill}
				viewBox='0 0 384 512'
			>
				<path d='M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z' />
			</svg>
		),
		flag: (
			<svg
				width={size}
				height={size}
				className={`${className}`}
				xmlns='http://www.w3.org/2000/svg'
				fill={fill}
				viewBox='0 0 448 512'
			>
				<path d='M64 32C64 14.3 49.7 0 32 0S0 14.3 0 32L0 64 0 368 0 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-128 64.3-16.1c41.1-10.3 84.6-5.5 122.5 13.4c44.2 22.1 95.5 24.8 141.7 7.4l34.7-13c12.5-4.7 20.8-16.6 20.8-30l0-247.7c0-23-24.2-38-44.8-27.7l-9.6 4.8c-46.3 23.2-100.8 23.2-147.1 0c-35.1-17.6-75.4-22-113.5-12.5L64 48l0-16z' />
			</svg>
		),
		target: (
			<svg
				width={size}
				height={size}
				className={`${className}`}
				xmlns='http://www.w3.org/2000/svg'
				fill={fill}
				viewBox='0 0 512 512'
			>
				<path d='M448 256A192 192 0 1 0 64 256a192 192 0 1 0 384 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 80a80 80 0 1 0 0-160 80 80 0 1 0 0 160zm0-224a144 144 0 1 1 0 288 144 144 0 1 1 0-288zM224 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z' />
			</svg>
		),
		circle: (
			<svg
				width={size}
				height={size}
				className={`${className}`}
				xmlns='http://www.w3.org/2000/svg'
				fill={fill}
				viewBox='0 0 512 512'
			>
				<path d='M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-352a96 96 0 1 1 0 192 96 96 0 1 1 0-192z' />
			</svg>
		),
		exit: (
			<svg
				width={size}
				height={size}
				className={`${className}`}
				xmlns='http://www.w3.org/2000/svg'
				fill={fill}
				viewBox='0 0 384 512'
			>
				<path d='M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z' />
			</svg>
		),
		clipboard: (
			<svg
				width={size}
				height={size}
				className={`${className}`}
				xmlns='http://www.w3.org/2000/svg'
				fill={fill}
				viewBox='0 0 384 512'
			>
				<path d='M280 64l40 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 128C0 92.7 28.7 64 64 64l40 0 9.6 0C121 27.5 153.3 0 192 0s71 27.5 78.4 64l9.6 0zM64 112c-8.8 0-16 7.2-16 16l0 320c0 8.8 7.2 16 16 16l256 0c8.8 0 16-7.2 16-16l0-320c0-8.8-7.2-16-16-16l-16 0 0 24c0 13.3-10.7 24-24 24l-88 0-88 0c-13.3 0-24-10.7-24-24l0-24-16 0zm128-8a24 24 0 1 0 0-48 24 24 0 1 0 0 48z' />
			</svg>
		),
		trivia: (
			<svg
				width={size}
				height={size}
				className={`${className}`}
				xmlns='http://www.w3.org/2000/svg'
				fill={fill}
				viewBox='0 0 320 512'
			>
				<path d='M80 160c0-35.3 28.7-64 64-64l32 0c35.3 0 64 28.7 64 64l0 3.6c0 21.8-11.1 42.1-29.4 53.8l-42.2 27.1c-25.2 16.2-40.4 44.1-40.4 74l0 1.4c0 17.7 14.3 32 32 32s32-14.3 32-32l0-1.4c0-8.2 4.2-15.8 11-20.2l42.2-27.1c36.6-23.6 58.8-64.1 58.8-107.7l0-3.6c0-70.7-57.3-128-128-128l-32 0C73.3 32 16 89.3 16 160c0 17.7 14.3 32 32 32s32-14.3 32-32zm80 320a40 40 0 1 0 0-80 40 40 0 1 0 0 80z' />
			</svg>
		),
		share: (
			<svg
				width={size}
				height={size}
				className={`${className}`}
				xmlns='http://www.w3.org/2000/svg'
				fill={fill}
				viewBox='0 0 576 512'
			>
				<path d='M352 224l-46.5 0c-45 0-81.5 36.5-81.5 81.5c0 22.3 10.3 34.3 19.2 40.5c6.8 4.7 12.8 12 12.8 20.3c0 9.8-8 17.8-17.8 17.8l-2.5 0c-2.4 0-4.8-.4-7.1-1.4C210.8 374.8 128 333.4 128 240c0-79.5 64.5-144 144-144l80 0 0-61.3C352 15.5 367.5 0 386.7 0c8.6 0 16.8 3.2 23.2 8.9L548.1 133.3c7.6 6.8 11.9 16.5 11.9 26.7s-4.3 19.9-11.9 26.7l-139 125.1c-5.9 5.3-13.5 8.2-21.4 8.2l-3.7 0c-17.7 0-32-14.3-32-32l0-64zM80 96c-8.8 0-16 7.2-16 16l0 320c0 8.8 7.2 16 16 16l320 0c8.8 0 16-7.2 16-16l0-48c0-17.7 14.3-32 32-32s32 14.3 32 32l0 48c0 44.2-35.8 80-80 80L80 512c-44.2 0-80-35.8-80-80L0 112C0 67.8 35.8 32 80 32l48 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L80 96z' />
			</svg>
		),
		spinner: (
			<svg
				width={size}
				height={size}
				className={`${className}`}
				fill={fill}
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 512 512'
			>
				<path d='M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z' />
			</svg>
		),
		threeDots: (
			<svg
				width={size}
				height={size}
				className={`${className}`}
				fill={fill}
				viewBox='0 0 24 24'
			>
				<path
					stroke='currentColor'
					strokeLinecap='round'
					strokeWidth='3'
					d='M12 6h.01M12 12h.01M12 18h.01'
				/>
			</svg>
		),
		vIcon: (
			<svg
				width={size}
				height={size}
				className={`${className}`}
				fill={fill}
				viewBox='0 0 24 24'
			>
				<path
					stroke='currentColor'
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth='2'
					d='M5 11.917 9.724 16.5 19 7.5'
				/>
			</svg>
		),
		xIcon: (
			<svg
				width={size}
				height={size}
				className={`${className}`}
				fill={fill}
				viewBox='0 0 24 24'
			>
				<path
					stroke='currentColor'
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth='3'
					d='M6 18 17.94 6M18 18 6.06 6'
				/>
			</svg>
		),
		logout: (
			<svg
				width={size}
				height={size}
				viewBox='0 0 128.000000 128.000000'
				preserveAspectRatio='xMidYMid meet'
			>
				<g
					transform='translate(0.000000,128.000000) scale(0.100000,-0.100000)'
					fill={fill}
					stroke='none'
				>
					<path
						d='M517 1226 c-91 -25 -178 -118 -197 -211 -26 -125 35 -251 152 -311
                             43 -22 147 -30 200 -15 149 42 234 211 182 363 -44 130 -202 212 -337 174z'
					/>
					<path
						d='M765 660 c-60 -39 -65 -62 -65 -298 0 -234 4 -252 60 -292 37 -26
                           154 -38 216 -21 51 14 88 51 79 80 -9 29 -42 37 -67 14 -16 -14 -36 -18 -100
                          -18 -111 0 -108 -8 -108 240 0 242 -3 235 111 235 51 0 82 -5 95 -15 25 -19
                          48 -19 64 0 17 21 3 54 -33 76 -47 28 -209 28 -252 -1z'
					/>
					<path
						d='M409 544 c-132 -23 -308 -95 -329 -133 -5 -11 -10 -78 -10 -149 0
                       -126 1 -130 26 -156 l27 -26 259 0 c244 0 260 1 252 17 -5 10 -10 118 -12 241
                         l-3 222 -67 -1 c-37 0 -101 -7 -143 -15z'
					/>
					<path
						d='M1043 503 c-20 -8 -15 -55 9 -80 l21 -23 -111 0 -112 0 -6 -27 c-11
                           -42 15 -53 130 -53 l99 0 -22 -24 c-29 -31 -25 -70 8 -74 18 -3 39 11 87 59
                            39 38 64 72 64 85 0 13 -25 45 -64 82 -61 59 -75 67 -103 55z'
					/>
				</g>
			</svg>
		),
	};

	return (
		<div
			className={`relative mx-auto w-fit ${name === 'spinner' ? 'animate-spin' : ''}`}
		>
			{notificationCount && (
				<span className='absolute right-0 top-0 size-4 -translate-y-2/3 translate-x-2/3 content-center rounded-full bg-primary text-center text-xs font-semibold leading-none text-white'>
					{notificationCount}
				</span>
			)}
			{icons[name]}
		</div>
	);
}
