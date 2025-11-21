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
} from '../../../src/constants/articleProps';
import { Separator } from 'src/ui/separator/Separator';

type PropsArticleParamsForm = {
	onChange: (data: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: PropsArticleParamsForm) => {
	const { onChange } = props;

	const asideRef = useRef<HTMLElement | null>(null); // Ссылка на dom aside чтобы добавлять класс открытия и убирать его

	const [isOpenAside, setIsOpenAside] = useState<boolean>(false); // Состояние aside на странице

	const [selectedFont, setSelectedFont] = useState<OptionType>(
		fontFamilyOptions[0]
	); // Состояние шрифта
	const [fontSize, setFontSize] = useState<OptionType>(fontSizeOptions[0]); // Состояние размера шрифта на странице
	const [fontColor, setFontColor] = useState<OptionType>(fontColors[0]); // Состояние цвета шрифта
	const [backgroundColor, setBackgroundColor] = useState<OptionType>(
		backgroundColors[0]
	); // Состояние цвет фона
	const [contentWidth, setContentWidth] = useState<OptionType>(
		contentWidthArr[0]
	); // Состояние ширины контента

	useEffect(() => {
		//Открытие и закрытие aside
		if (isOpenAside) {
			asideRef.current!.classList.add(styles.container_open);
		} else {
			asideRef.current!.classList.remove(styles.container_open);
		}
	}, [isOpenAside]);

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
		setSelectedFont(fontFamilyOptions[0]),
			setFontSize(fontSizeOptions[0]),
			setFontColor(fontColors[0]),
			setBackgroundColor(backgroundColors[0]),
			setContentWidth(contentWidthArr[0]);
		onChange({
			fontFamilyOption: fontFamilyOptions[0],
			fontSizeOption: fontSizeOptions[0],
			fontColor: fontColors[0],
			backgroundColor: backgroundColors[0],
			contentWidth: contentWidthArr[0],
		});
	}
	return (
		<>
			<ArrowButton
				isOpen={isOpenAside}
				onClick={() => {
					toggleIsOpen();
				}}
			/>
			<aside className={styles.container} ref={asideRef}>
				<form
					className={styles.form}
					onSubmit={(event) => collectorParams(event)}>
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
						onChange={(value) => {
							setSelectedFont(value);
						}}
					/>
					<RadioGroup
						options={fontSizeOptions}
						selected={fontSize}
						title={'РАЗМЕР ШРИФТА'}
						onChange={(value) => {
							setFontSize(value);
						}}
						name={'fontSize'}
					/>
					<Select
						options={fontColors}
						selected={fontColor}
						title={'ЦВЕТ ШРИФТА'}
						onChange={(value) => {
							setFontColor(value);
						}}
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={backgroundColor}
						title={'ЦВЕТ ФОНА'}
						onChange={(value) => {
							setBackgroundColor(value);
						}}
					/>
					<Select
						options={contentWidthArr}
						selected={contentWidth}
						title={'ШИРИНА КОНТЕНТА'}
						onChange={(value) => {
							setContentWidth(value);
						}}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={() => {
								backToDefaultStyles();
							}}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
