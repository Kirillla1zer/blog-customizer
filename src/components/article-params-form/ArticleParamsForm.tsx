import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { useState, useRef, useEffect, FormEvent } from 'react';

import styles from './ArticleParamsForm.module.scss';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import {
	fontSizeOptions,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	OptionType,
	ArticleStateType,
	defaultArticleState,
} from '../../../src/constants/articleProps';

import { Separator } from 'src/ui/separator/Separator';
import clsx from 'clsx';

type PropsArticleParamsForm = {
	onChange: (data: ArticleStateType) => void;
	currentArticleState: ArticleStateType;
};

export const ArticleParamsForm = (props: PropsArticleParamsForm) => {
	const { onChange, currentArticleState } = props;

	const asideRef = useRef<HTMLElement>(null); // Ссылка на dom aside чтобы добавлять проверять что обработчик закрытия сайдбара тыкнул не на сайд бар
	const arrowButtonRef = useRef<HTMLDivElement>(null);
	const [isOpenAside, setIsOpenAside] = useState<boolean>(false); // Состояние aside на странице

	const [selectedFont, setSelectedFont] = useState<OptionType>(
		currentArticleState.fontFamilyOption
	); // Состояние шрифта
	const [fontSize, setFontSize] = useState<OptionType>(
		currentArticleState.fontSizeOption
	); // Состояние размера шрифта на странице
	const [fontColor, setFontColor] = useState<OptionType>(
		currentArticleState.fontColor
	); // Состояние цвета шрифта
	const [backgroundColor, setBackgroundColor] = useState<OptionType>(
		currentArticleState.backgroundColor
	); // Состояние цвет фона
	const [contentWidth, setContentWidth] = useState<OptionType>(
		currentArticleState.contentWidth
	); // Состояние ширины контента

	//Смена состояние у aside
	function toggleIsOpen() {
		setIsOpenAside(!isOpenAside);
	}

	//Передаёт обьект новых настроек при нажатии на кнопку применить
	function collectorParams(event: FormEvent) {
		event.preventDefault();
		onChange({
			fontFamilyOption: selectedFont,
			fontSizeOption: fontSize,
			fontColor,
			backgroundColor,
			contentWidth,
		});
	}

	function backToDefaultStyles() {
		setSelectedFont(defaultArticleState.fontFamilyOption),
			setFontSize(defaultArticleState.fontSizeOption),
			setFontColor(defaultArticleState.fontColor),
			setBackgroundColor(defaultArticleState.backgroundColor),
			setContentWidth(defaultArticleState.contentWidth);
		onChange({
			fontFamilyOption: defaultArticleState.fontFamilyOption,
			fontSizeOption: defaultArticleState.fontSizeOption,
			fontColor: defaultArticleState.fontColor,
			backgroundColor: defaultArticleState.backgroundColor,
			contentWidth: defaultArticleState.contentWidth,
		});
	}

	useEffect(() => {
		if (!isOpenAside) return;

		const handleClick = (e: Event) => {
			if (!(e.target instanceof HTMLElement)) return;

			if (
				!asideRef.current!.contains(e.target as HTMLElement) &&
				!arrowButtonRef.current!.contains(e.target as HTMLElement) &&
				!e.target.closest('[data-testid="selectDropdown"]')
			) {
				setIsOpenAside(false);
			}
		};

		document.addEventListener('click', handleClick);

		return () => {
			return document.removeEventListener('click', handleClick);
		};
	}, [isOpenAside]);
	return (
		<>
			<ArrowButton
				isOpen={isOpenAside}
				onClick={() => {
					toggleIsOpen();
				}}
				refFromArticleParams={arrowButtonRef}
			/>
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isOpenAside,
				})}
				ref={asideRef}>
				<form
					className={styles.form}
					onSubmit={(event) => collectorParams(event)}
					onReset={backToDefaultStyles}>
					<Text
						as={'h2'}
						weight={800}
						size={31}
						family='open-sans'
						uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={selectedFont}
						title={'Шрифт'}
						onChange={setSelectedFont}
					/>
					<RadioGroup
						options={fontSizeOptions}
						selected={fontSize}
						title={'РАЗМЕР ШРИФТА'}
						onChange={setFontSize}
						name={'fontSize'}
					/>
					<Select
						options={fontColors}
						selected={fontColor}
						title={'ЦВЕТ ШРИФТА'}
						onChange={setFontColor}
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={backgroundColor}
						title={'ЦВЕТ ФОНА'}
						onChange={setBackgroundColor}
					/>
					<Select
						options={contentWidthArr}
						selected={contentWidth}
						title={'ШИРИНА КОНТЕНТА'}
						onChange={setContentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
