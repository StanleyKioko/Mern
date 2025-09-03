export function Contact() {

    function handleSubmit() {
    return (
        <div>
            <h1>Contact Us</h1>
            <p>If you have any questions or feedback, please feel free to reach out to us!</p>
            <p>Email: support@blogplatform.com</p>
            <p>Alternatively you can fill out our</p>
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input onChange={(e) => setName(e.target.value)} maxLength={100} required value={name} type="text" placeholder="Your Name" />
                <label>Email</label>
                <input onChange={(e) => setEmail(e.target.value)} maxLength={100} required value={email} type="email" placeholder="Your Email" />
                <label>Message</label>
                <textarea onChange={(e) => setMessage(e.target.value)} maxLength={2000} required value={message} placeholder="Your Message" />
                <button type="submit">Submit</button>
            </form>

        </div>
    )
}
