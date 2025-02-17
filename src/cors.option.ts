const CorsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type, Authorization"],
    credentials: true,
    maxAge: 86400,

};

export { CorsOptions };
