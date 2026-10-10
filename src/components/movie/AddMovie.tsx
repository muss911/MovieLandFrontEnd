function AddMovie (showForm)
{
    return(
        <>
            <header className="header">
            <div className='container'>               
                <button onClick={()=>showForm(true)} className="btn">
                    <i className='bi bi-plus-square'></i>
                    Add new Contact
                </button>
            </div>
        </header>
        </>
    )
}
export default AddMovie