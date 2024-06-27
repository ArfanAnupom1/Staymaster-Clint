

const SectionTitle = ({ heading, subHeading }) => {
    return (
        <div className="md:w-3/12 mx-auto my-8 text-center">
            <p className="text-yellow-600">{heading}</p>
            <h3 className="text-4xl uppercase border-y-4 py-4 mt-4 " >{subHeading}</h3>

        </div>
    );
};

export default SectionTitle;