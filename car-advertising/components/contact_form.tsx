'use client'
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { sendEmail } from '@/utils/send-email';
import styles from './contact_form.module.css'

export type FormData = {
    name: string;
    company: string;
    phone: number;
    email: string;
    message: string;
};

const Contact: FC = () => {
    const { register, handleSubmit } = useForm<FormData>();

    function onSubmit(data: FormData) {
        sendEmail(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.main}>
                <div className={styles.formGroup}>
                    <label htmlFor='name' className={styles.label}>
                        Name
                    </label>
                    <input
                    type='text'
                    placeholder='Name'
                    className={styles.inputField}
                    {...register('name', { required: true })}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor='company' className={styles.label}>
                        Company
                    </label>
                    <input
                        type='text'
                        placeholder='Company'
                        className={styles.inputField}
                        {...register('company', { required: false })}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor='phone' className={styles.label}>
                        Phone number
                    </label>
                    <input
                        type='number'
                        placeholder='Phone number'
                        className={styles.inputField}
                        {...register('phone', {required: false})}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor='email' className={styles.label}>
                    Email Address
                    </label>
                    <input
                    type='email'
                    placeholder='example@domain.com'
                    className={styles.inputField}
                    {...register('email', { required: true })}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor='message' className={styles.label}>
                    Message
                    </label>
                    <textarea
                    rows={4}
                    placeholder='Type your message'
                    className={styles.textareaField}
                    {...register('message', { required: true })}
                    ></textarea>
                </div>

                <div className={styles.btn}>
                    <button className={styles.submitButton} type='submit'>
                    Submit
                    </button>
                </div>
            </div>
        </form>
    )
}

export default Contact;