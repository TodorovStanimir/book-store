/* global i18n */
import React, { useState, useContext } from 'react';
import GoogleMapReact from 'google-map-react';
import styles from './index.module.css';
import PageLayout from '../../components/page-layout';
import { UserContext, NotificationContext } from '../../Context';
import InputEl from '../../components/input-el';
import { usernameValidator, emailValidator, phoneValidator, messageValidator } from '../../utils/validators';
import ValidatorEl from '../../components/validator-el';
import SubmitButton from '../../components/submit-button';
import TextareaEl from '../../components/textarea-el';
import messageService from '../../services/message-service';

const ContactUs = (props) => {

    const { user } = useContext(UserContext);
    const notificationContext = useContext(NotificationContext);

    const [inputData, setState] = useState({
        username: user ? user.username : '',
        email: user ? user.email : '',
        phone: user ? user.phone : '',
        message: '',
    });

    const [validators, setValidators] = useState({
        username: true,
        email: true,
        phone: true,
        message: true
    });

    const handleSubmitMessage = async (e) => {
        e.preventDefault();

        const result = await messageService( 'post', 'create', { username, email, phone, message }, null);

        if (Array.isArray(result) || result.isAxiosError) {
            notificationContext.showNotification(result);
            return;
        }

        setState({
            username: user ? user.username : '',
            email: user ? user.email : '',
            phone: user ? user.phone : '',
            message: '',
        })

        setValidators({
            username: true,
            email: true,
            phone: true,
            message: true
        })
        notificationContext.showNotification([{ msg: i18n('successSended') }]);
    }

    const onChange = (e) => {
        const currentControl = {
            username: usernameValidator,
            email: emailValidator,
            phone: phoneValidator,
            message: messageValidator
        }[e.target.name].test(e.target.value)

        setState({ ...inputData, [e.target.name]: e.target.value })
        setValidators({ ...validators, [e.target.name]: currentControl })
    }


    const renderMarkers = (map, maps) => {
        let marker = new maps.Marker({
            position: { lat: 43.212804, lng: 27.919648 },
            map,
            title: `Book store Ltd.`
        });
        return marker;
    };

    const { username, email, phone, message } = inputData;
    const { username: correctUsername, email: correctEmail, phone: correctPhone, message: correctMessage } = validators;
    const btnDisabled = Object.values(validators).includes(false) || Object.values(inputData).includes('');;

    return (
        <PageLayout>
            <div className={styles['grid-container']}>
                <div className={styles['first-grid']}>
                    <div className={styles.address}>{i18n('address')}</div>
                    <div className={styles.map}>
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: 'AIzaSyCE3ri-RXlBTx_dfZOgqFSPxHOlu3G8oog' }}
                            defaultCenter={{ lat: 43.213, lng: 27.920 }}
                            defaultZoom={16}
                            yesIWantToUseGoogleMapApiInternals
                            onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
                        >
                        </GoogleMapReact>
                    </div>
                </div>
                <div className={styles['first-grid']}>
                    <div className={styles.address}>{i18n('contactUs')}</div>
                    <div className={styles.message}>
                        <form onSubmit={(e) => handleSubmitMessage(e)}>
                            <ValidatorEl
                                validator={correctUsername}
                                message={i18n('userNameField')}
                            />
                            <InputEl
                                classNameDivEl='input-group'
                                classNameIEl='fa fa-user'
                                type='text  '
                                name='username'
                                placeholder={i18n('username')}
                                isValid={correctUsername}
                                value={username}
                                onChange={onChange}
                            />
                            <ValidatorEl
                                validator={correctEmail}
                                message={i18n('userEmailField')}
                            />
                            <InputEl
                                classNameDivEl='input-group'
                                classNameIEl='fa fa-envelope'
                                type='email'
                                name='email'
                                placeholder={i18n('email')}
                                isValid={correctEmail}
                                value={email}
                                onChange={onChange}
                            />
                            <ValidatorEl
                                validator={correctPhone}
                                message={i18n('userPhoneField')}
                            />
                            <InputEl
                                classNameDivEl='input-group'
                                classNameIEl='fa fa-phone'
                                type='text'
                                name='phone'
                                placeholder={i18n('userPhone')}
                                isValid={correctPhone}
                                value={phone}
                                onChange={onChange}
                            />
                            <ValidatorEl
                                validator={correctMessage}
                                message={i18n('messageField', 20)}
                            />
                            <TextareaEl
                                classNameDivEl={'input-group'}
                                classNameIEl={'fa fa-edit'}
                                type='text'
                                name='message'
                                rows='3'
                                placeholder={i18n('message')}
                                isValid={correctMessage}
                                value={message}
                                onChange={onChange}
                            />
                            <SubmitButton
                                className={'submit-button-userprofile'}
                                btnText={i18n('userMessage')}
                                disabled={btnDisabled} />
                        </form>
                    </div>
                </div>
            </div>
        </PageLayout>
    )
}

export default ContactUs;