import { Plus } from 'lucide-react';

function page() {
    // const handleSelectImage = async (event) => {
    //     const files = event.target.files;
    //     // Handle file selection and conversion here
    // };
    return (
        <div>
            <section className="bg-gray-900 text-white">
                <div className="mx-auto max-w-screen-xl -mt-20 px-4 py-32 lg:flex lg:h-screen lg:items-center">
                    <div className="mx-auto max-w-3xl text-center">
                        <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
                            JPEG to WebP Batch Converter
                        </h1>

                        <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
                            Upload multiple JPEG images and specify the desired
                            quality for the conversion to WebP format. After
                            processing, you can download the converted images as
                            a ZIP file
                        </p>

                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                            <div className="group relative inline-block focus:outline-none focus:ring ">
                                <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-blue-600 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>

                                <label
                                    htmlFor="file-upload"
                                    className="cursor-pointer relative inline-block border-2 border-current px-20 py-3 text-sm font-bold uppercase tracking-widest text-white group-active:text-opacity-75"
                                >
                                    <div className="flex items-center gap-5">
                                        <Plus /> Select Image
                                    </div>
                                </label>
                                <input
                                    id="file-upload"
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default page;
