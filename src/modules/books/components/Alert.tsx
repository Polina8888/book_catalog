import { Alert } from 'react-bootstrap';

export default function AlertComponent({ showAlert }: { showAlert: boolean}) {
    return (
        <Alert variant='primary' className={`alert-slow ${showAlert ? 'alert-show' : ''}`}
            style={{
                position: 'fixed',
                bottom: '1rem',
                right: '1rem',
                zIndex: 9999,
                boxShadow: '0px 0px 10px rgba(0,0,0,0.2)',
                borderRadius: '8px',
                padding: '10px 20px',
                width: '15rem'
            }}>
            Book added to cart!
        </Alert>
    )
}