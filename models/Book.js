module.exports = db => {
    const {Schema} = db;
    const bookSchema = new Schema(
        {
            googleBooksId: {
                type: String,
                required: true,
                index:  true,
                unique: true,
            },
            title:  {
                type: String,
                required: true,
            },
            subtitle: {
                type: String,
            },
            authors: {
                type: [String],
            },
            description: {
                type: String,
            },
            image: {
                type: String,
            },
            link: {
                type: String,
            },
        },
        { timestamps: true }
    );
    return db.model("Book", bookSchema);
};