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

    const [validators, setValidators] = useState({
        title: true,
        author: true,
        description: true,
        genres: true,
        year: true,
        publisher: true,
        price: true,
        imageUrl: true
    });

    useEffect(() => {
        const isEditingMode = inputData.isEditingMode;
        const fetchData = async () => {
            showLoader();
            const book = await bookService('get', bookId);
            setInputData({ ...inputData, book: { ...book }, isEditingMode: true });
        }
        if (bookId && !isEditingMode) { fetchData(); }

    }, [bookId, setInputData, inputData, showLoader]);

    const onChange = (e) => {
        const currentValidator = {
            title: titleValidator,
            author: authorValidator,
            description: descriptionValidator,
            genres: genresValidator,
            year: yearValidator,
            publisher: publisherValidator,
            price: priceValidator,
            imageUrl: imageUrlValidator
        }[e.target.name].test(e.target.value);

        setInputData({ ...inputData, book: { ...inputData.book, [e.target.name]: e.target.value } });
        setValidators({ ...validators, [e.target.name]: currentValidator });
    }

    const {
        title: correctTitle,
        author: correctAuthor,
        description: correctDescription,
        genres: correctGenres,
        year: correctYear,
        publisher: correctPublisher,
        price: correctPrice,
        imageUrl: correctImageUrl
    } = validators

    const { title, author, description, genres, year, publisher, price, imageUrl } = inputData.book;
    const { isEditingMode } = inputData;

    const onSubmit = async (e) => {
        e.preventDefault();
        showLoader();
        const method = bookId ? 'put' : 'post';
        const book = inputData.book;
        const result = await bookService(method, bookId, book, token)

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
                                            message={'Title shoud contain at least 2 signs'}
                                        />
                                        <InputEl
                                            classNameDivEl={'input-group'}
                                            classNameSpanEl={'span-el'}
                                            classNameIEl={'fa fa-book'}
                                            type='text'
                                            name='title'
                                            placeholder='Book title'
                                            isValid={correctTitle}
                                            value={title}
                                            onChange={onChange}
                                        />
                                    </div>
                                    <div className={styles['firstr-secondc']}>
                                        <ValidatorEl
                                            validator={correctAuthor}
                                            message={'Author name should contain at least 5 signs'}
                                        />
                                        <InputEl
                                            classNameDivEl={'input-group'}
                                            classNameSpanEl={'span-el'}
                                            classNameIEl={'fa fa-user-tie'}
                                            type='text'
                                            name='author'
                                            placeholder="Book's author"
                                            isValid={correctAuthor}
                                            value={author}
                                            onChange={onChange}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <ValidatorEl
                                            validator={correctDescription}
                                            message={'Description should contain at least 40 signs'}
                                        />
                                        <TextareaEl
                                            classNameDivEl={'input-group'}
                                            classNameSpanEl={'span-el'}
                                            classNameIEl={'fa fa-edit'}
                                            type='text'
                                            name='description'
                                            rows='3'
                                            placeholder="Description"
                                            isValid={correctDescription}
                                            value={description}
                                            onChange={onChange}
                                        />
                                    </div>
                                </div>
                                <div className={styles['thirdr']}>
                                    <div className={styles['thirdr-firstc']}>
                                        <ValidatorEl
                                            validator={correctGenres}
                                            message={'Genres should contain genres of book separeted by comma and space'}
                                        />
                                        <InputEl
                                            classNameDivEl={'input-group'}
                                            classNameSpanEl={'span-el'}
                                            classNameIEl={'fa fa-folder'}
                                            type='text'
                                            name='genres'
                                            placeholder="Genres book"
                                            isValid={correctGenres}
                                            value={genres}
                                            onChange={onChange}
                                        />
                                    </div>
                                    <div className={styles['thirdr-secondc']}>
                                        <ValidatorEl
                                            validator={correctYear}
                                            message={'Year should contain exactly 4 digits'}
                                        />
                                        <InputEl
                                            classNameDivEl={'input-group'}
                                            classNameSpanEl={'span-el'}
                                            classNameIEl={'fa fa-calendar-alt'}
                                            type='number'
                                            step='1'
                                            name='year'
                                            placeholder="Year issue"
                                            isValid={correctYear}
                                            value={year}
                                            onChange={onChange}
                                        />
                                    </div>
                                </div>
                                <div className={styles.fourthr}>
                                    <div className={styles['fourthr-firstc']}>
                                        <ValidatorEl
                                            validator={correctPublisher}
                                            message={'Publishers should contain at least 6 signs'}
                                        />
                                        <InputEl
                                            classNameDivEl={'input-group'}
                                            classNameSpanEl={'span-el'}
                                            classNameIEl={'fa fa-user-tie'}
                                            type='text'
                                            name='publisher'
                                            placeholder="Publisher"
                                            isValid={correctPublisher}
                                            value={publisher}
                                            onChange={onChange}
                                        />
                                    </div>
                                    <div className={styles['fourthr-secondc']}>
                                        <ValidatorEl
                                            validator={correctPrice}
                                            message={'Price should be at least 0.01'}
                                        />
                                        <InputEl
                                            classNameDivEl={'input-group'}
                                            classNameSpanEl={'span-el'}
                                            classNameIEl={'fa fa-dollar-sign'}
                                            type='number'
                                            step='0.01  '
                                            name='price'
                                            placeholder="Price"
                                            isValid={correctPrice}
                                            value={price}
                                            onChange={onChange}
                                        />
                                    </div>
                                </div>
                                <div className={styles.fifthr}>
                                    <div className={styles['fifthr-firstc']}>
                                        <ValidatorEl
                                            validator={correctImageUrl}
                                            message={'Image Url should start wth http:// or https://'}
                                        />
                                        <InputEl
                                            classNameDivEl={'input-group'}
                                            classNameSpanEl={'span-el'}
                                            classNameIEl={'fa fa-image'}
                                            type='text'
                                            name='imageUrl'
                                            placeholder="ImageUrl"
                                            isValid={correctImageUrl}
                                            value={imageUrl}
                                            onChange={onChange}
                                        />
                                    </div>
                                    <div className={styles['fifthr-secondc']}>
                                        <div className="form-group">
                                            {isEditingMode
                                                ? <SubmitButton
                                                    btnText={'Edit your book!'}
                                                    disabled={false}
                                                />
                                                : <SubmitButton
                                                    btnText={'Create your book!'}
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