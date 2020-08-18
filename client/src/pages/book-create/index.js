/* global i18n */
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import styles from './index.module.css';
import PageLayout from '../../components/page-layout';
import InputEl from '../../components/input-el';
import ValidatorEl from '../../components/validator-el';
import TextareaEl from '../../components/textarea-el';
import SubmitButton from '../../components/submit-button';
import { titleValidator, authorValidator, descriptionValidator, genresValidator } from '../../utils/validators';
import { yearValidator, publisherValidator, priceValidator, imageUrlValidator } from '../../utils/validators';
import bookService from '../../services/book-service';
import { NotificationContext, LoaderContext } from '../../Context';
import getCookie from '../../utils/getCookie';
import InputUploadEl from '../../components/input-upload-el';

const CreateBook = (props) => {
    const history = useHistory();
    const bookId = useParams().id;
    const token = getCookie('x-auth-token');

    const { showNotification } = useContext(NotificationContext);
    const { showLoader } = useContext(LoaderContext);

    const [inputData, setInputData] = useState({
        book: {
            title: '',
            author: '',
            description: '',
            genres: '',
            year: '',
            publisher: '',
            price: '',
            imageUrl: ''
        },
        isEditingMode: false
    });

    const [uploadImgBtnDisabled, setUploadImgBtnDisabled] = useState(false);

    const [validators, setValidators] = useState({
        correctTitle: true,
        correctAuthor: true,
        correctDescription: true,
        correctGenres: true,
        correctYear: true,
        correctPublisher: true,
        correctPrice: true,
        correctImageUrl: true
    });

    useEffect(() => {
        const isEditingMode = inputData.isEditingMode;
        const fetchData = async () => {
            showLoader();
            const book = await bookService({method: 'get'}, bookId);
            setInputData({ ...inputData, book: { ...book }, isEditingMode: true });
        }
        if (bookId && !isEditingMode) { fetchData(); }

    }, [bookId, setInputData, inputData, showLoader]);

    const onChange = (e) => {
        const currentValidator = {
            correctTitle: titleValidator,
            correctAuthor: authorValidator,
            correctDescription: descriptionValidator,
            correctGenres: genresValidator,
            correctYear: yearValidator,
            correctPublisher: publisherValidator,
            correctPrice: priceValidator,
            correctImageUrl: imageUrlValidator
        }[e.target.dataset.validator].test(e.target.value);

        setInputData({ ...inputData, book: { ...inputData.book, [e.target.name]: e.target.value } });
        setValidators({ ...validators, [e.target.dataset.validator]: currentValidator });
    }

    const {
        correctTitle,
        correctAuthor,
        correctDescription,
        correctGenres,
        correctYear,
        correctPublisher,
        correctPrice,
        correctImageUrl
    } = validators

    const openWidget = () => {
        window.cloudinary.createUploadWidget(
            {
                cloudName: 'dv0zd1ahz',
                uploadPreset: 'booksstore',
            },
            (error, result) => {
                if (result.event === 'success') {
                    setInputData({ ...inputData, book: { ...inputData.book, imageUrl: result.info.url } })
                    setValidators({ ...validators, correctImageUrl: true })
                    setUploadImgBtnDisabled(true)
                }
            },
        ).open();
    };

    const { title, author, description, genres, year, publisher, price, imageUrl } = inputData.book;
    const { isEditingMode } = inputData;

    const onSubmit = async (e) => {
        e.preventDefault();
        showLoader();
        const method = bookId ? 'put' : 'post';
        const book = inputData.book;
        const result = await bookService({method}, bookId, book, token)

        if (Array.isArray(result) || result.isAxiosError) {
            showNotification(result);
            return;
        }
        history.goBack()
    }

    const btnDisabled = Object.values(validators).includes(false) || Object.values(inputData.book).includes('');

    return (
        <PageLayout>
            {!isEditingMode && bookId
                ? null
                : <div className={styles['grid-container']}>
                    <div className={styles.grid}>
                        <div className={styles['grid-item']}>
                            <form onSubmit={onSubmit}>
                                <div className={styles.firstr}>
                                    <div className={styles['firstr-firstc']}>
                                        <ValidatorEl
                                            validator={correctTitle}
                                            message={i18n('bookTitleField', 2)}
                                        />
                                        <InputEl
                                            classNameDivEl={'input-group'}
                                            classNameIEl={'fa fa-book'}
                                            type='text'
                                            name='title'
                                            placeholder={i18n('bookTitle')}
                                            isValid={correctTitle}
                                            value={title}
                                            onChange={onChange}
                                            validator='correctTitle'
                                        />
                                    </div>
                                    <div className={styles['firstr-secondc']}>
                                        <ValidatorEl
                                            validator={correctAuthor}
                                            message={i18n('bookAuthorField', 5)}
                                        />
                                        <InputEl
                                            classNameDivEl={'input-group'}
                                            classNameIEl={'fa fa-user-tie'}
                                            type='text'
                                            name='author'
                                            placeholder={i18n('bookAuthor')}
                                            isValid={correctAuthor}
                                            value={author}
                                            onChange={onChange}
                                            validator='correctAuthor'
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <ValidatorEl
                                            validator={correctDescription}
                                            message={i18n('bookDescriptionField', 40)}
                                        />
                                        <TextareaEl
                                            classNameDivEl={'input-group'}
                                            classNameIEl={'fa fa-edit'}
                                            type='text'
                                            name='description'
                                            rows='3'
                                            placeholder={i18n('bookDescription')}
                                            isValid={correctDescription}
                                            value={description}
                                            onChange={onChange}
                                            validator='correctDescription'
                                        />
                                    </div>
                                </div>
                                <div className={styles['thirdr']}>
                                    <div className={styles['thirdr-firstc']}>
                                        <ValidatorEl
                                            validator={correctGenres}
                                            message={i18n('bookGenresField')}
                                        />
                                        <InputEl
                                            classNameDivEl={'input-group'}
                                            classNameIEl={'fa fa-folder'}
                                            type='text'
                                            name='genres'
                                            placeholder={i18n('bookGenres')}
                                            isValid={correctGenres}
                                            value={genres}
                                            onChange={onChange}
                                            validator='correctGenres'
                                        />
                                    </div>
                                    <div className={styles['thirdr-secondc']}>
                                        <ValidatorEl
                                            validator={correctYear}
                                            message={i18n('bookYearField')}
                                        />
                                        <InputEl
                                            classNameDivEl={'input-group'}
                                            classNameIEl={'fa fa-calendar-alt'}
                                            type='number'
                                            step='1'
                                            name='year'
                                            placeholder={i18n('bookYear')}
                                            isValid={correctYear}
                                            value={year}
                                            onChange={onChange}
                                            validator='correctYear'
                                        />
                                    </div>
                                </div>
                                <div className={styles.fourthr}>
                                    <div className={styles['fourthr-firstc']}>
                                        <ValidatorEl
                                            validator={correctPublisher}
                                            message={i18n('bookPublisherField', 6)}
                                        />
                                        <InputEl
                                            classNameDivEl={'input-group'}
                                            classNameIEl={'fa fa-user-tie'}
                                            type='text'
                                            name='publisher'
                                            placeholder={i18n('bookPublisher')}
                                            isValid={correctPublisher}
                                            value={publisher}
                                            onChange={onChange}
                                            validator='correctPublisher'
                                        />
                                    </div>
                                    <div className={styles['fourthr-secondc']}>
                                        <ValidatorEl
                                            validator={correctPrice}
                                            message={i18n('bookPriceField')}
                                        />
                                        <InputEl
                                            classNameDivEl={'input-group'}
                                            classNameIEl={'fa fa-dollar-sign'}
                                            type='number'
                                            step='0.01  '
                                            name='price'
                                            placeholder={i18n('bookPrice')}
                                            isValid={correctPrice}
                                            value={price}
                                            onChange={onChange}
                                            validator='correctPrice'
                                        />
                                    </div>
                                </div>
                                <div className={styles.fifthr}>
                                    <div className={styles['fifthr-firstc']}>
                                        <ValidatorEl
                                            validator={correctImageUrl}
                                            message={i18n('bookImageUrlField')}
                                        />
                                        <InputUploadEl
                                            classNameDivEl={'input-group'}
                                            classNameIEl={'fa fa-image'}
                                            classNameBtnEl={'btn'}
                                            type='url'
                                            name='imageUrl'
                                            placeholder={i18n('bookImageUrl')}
                                            btntext={i18n('uploadImgButton')}
                                            isValid={correctImageUrl}
                                            value={imageUrl}
                                            onChange={onChange}
                                            onClick={openWidget}
                                            disabled={uploadImgBtnDisabled}
                                            validator='correctImageUrl'
                                        />
                                    </div>
                                    <div className={styles['fifthr-secondc']}>
                                        <div className="form-group">
                                            {isEditingMode
                                                ? <SubmitButton
                                                    btnText={i18n('bookEditButton')}
                                                    disabled={btnDisabled}
                                                />
                                                : <SubmitButton
                                                    btnText={i18n('bookCreateButton')}
                                                    disabled={btnDisabled}
                                                />
                                            }
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div >
                </div >
            }
        </PageLayout>
    )
}

export default CreateBook