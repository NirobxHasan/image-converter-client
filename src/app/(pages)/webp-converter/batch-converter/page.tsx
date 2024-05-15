'use client';
import axios from 'axios';
import { Plus, Repeat } from 'lucide-react';
import { ChangeEvent, useState } from 'react';
import { PropagateLoader } from 'react-spinners';
function page() {
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState<File[]>([]);
    const [quality, setQuality] = useState(50);
    const [zipUrl, setZipUrl] = useState<null | string>(null);
    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedImages: File[] = Array.from(event.target.files || []);
        setImages(selectedImages);
    };

    const handleQualityChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuality(parseInt(event.target.value));
    };

    const handleSubmit = async (event) => {
        setLoading(true);
        const formData = new FormData();
        images.forEach((image) => {
            formData.append('images', image);
        });
        formData.append('quality', quality);

        try {
            const response = await axios.post(
                'http://localhost:8000/convert_to_webp-batch/',
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    responseType: 'blob'
                }
            );

            const blob = new Blob([response.data], { type: 'application/zip' });
            const zipUrl = URL.createObjectURL(blob);
            setZipUrl(zipUrl);
            setLoading(false);
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const stateClear = () => {
        setZipUrl(null);
        setImages([]);
        setQuality(50);
    };

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

                        {!zipUrl ? (
                            <div>
                                {!loading ? (
                                    <div>
                                        <div className="mt-12 flex flex-wrap justify-center gap-4">
                                            <div className="group relative inline-block focus:outline-none focus:ring ">
                                                {/* <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-green-600 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span> */}

                                                <div className="cursor-pointer relative inline-block border-2 border-current pl-8 text-sm font-bold uppercase tracking-widest text-white group-active:text-opacity-75">
                                                    <div className="flex items-center gap-5">
                                                        <label htmlFor="quality">
                                                            Quality
                                                        </label>
                                                        <input
                                                            id="quality"
                                                            type="number"
                                                            min={'1'}
                                                            max={'100'}
                                                            className="py-3.5 px-2 bg-gray-900 text-white border-transparent focus:outline-none focus:border-transparent focus:ring-0"
                                                            defaultValue={
                                                                quality
                                                            }
                                                            onChange={
                                                                handleQualityChange
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="group relative inline-block focus:outline-none focus:ring ">
                                                {/* <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-blue-600 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span> */}

                                                <label
                                                    htmlFor="file-upload"
                                                    className="cursor-pointer relative inline-block border-2 border-current px-20 py-3 "
                                                >
                                                    <div className="flex items-center gap-5 text-sm font-bold uppercase tracking-widest text-white group-active:text-opacity-75">
                                                        <Plus /> Select Image
                                                    </div>
                                                </label>
                                                <input
                                                    id="file-upload"
                                                    type="file"
                                                    className="hidden"
                                                    multiple
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="mt-8">
                                            <button
                                                onClick={handleSubmit}
                                                className="group relative inline-block focus:outline-none focus:ring "
                                            >
                                                <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-blue-600 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>

                                                <span className="cursor-pointer relative inline-block border-2 border-current px-20 py-3 text-sm font-bold uppercase tracking-widest text-white group-active:text-opacity-75">
                                                    <div className="flex items-center gap-5">
                                                        <Repeat /> Convert to
                                                        WebP
                                                    </div>
                                                    {images?.length > 0 && (
                                                        <div className="mt-2 text-center">
                                                            <p className="text-xs text-purple-200">
                                                                Total Selected
                                                                Images:{' '}
                                                                {images?.length}
                                                            </p>
                                                        </div>
                                                    )}
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="">
                                        <div className="mt-12  text-center">
                                            <PropagateLoader
                                                color="#3B7CFF"
                                                size={30}
                                            />
                                        </div>
                                        <p className="pt-12 text-gray-300 animate-pulse">
                                            Please wait some moments
                                        </p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="mt-10">
                                <div className="mt-4 flex flex-col items-center space-y-4">
                                    <a
                                        className=" animate-pulse group inline-block rounded bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
                                        href={zipUrl}
                                        download="converted_images.zip"
                                    >
                                        <span className="block rounded-sm px-8 py-3 text-sm font-medium group-hover:bg-transparent">
                                            Download Converted Images
                                        </span>
                                    </a>

                                    <button
                                        onClick={stateClear}
                                        className="inline-flex items-center gap-2 rounded border border-indigo-600 px-8 py-2 text-indigo-400 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
                                    >
                                        <span className="text-sm font-medium">
                                            Convert Again
                                        </span>

                                        <svg
                                            className="size-5 rtl:rotate-180"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default page;
