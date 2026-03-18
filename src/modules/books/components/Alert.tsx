export default function AlertComponent({ showAlert }: { showAlert: boolean }) {
    return (
        <div className={`custom-alert alert-slow ${showAlert ? 'alert-show' : ''}`}>
            The book was added to the cart!
        </div>
    )
}