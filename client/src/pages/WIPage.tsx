import { Link, useLoaderData } from "react-router-dom";

export default function WIPage() {

  const webcontent = useLoaderData();

  return (
    <div className="text-center justify-between flex flex-col">
      <p className="my-8 text-xl lg:text-5xl font-bold">
         {webcontent.page.title.content}
      </p>
      <div className="m-auto lg:w-[50%] lg:max-w-[600px]">
        <img src={webcontent.commons.img.imgPath.content+webcontent.page.imgSrc.content} width="100%" />
      </div>
      <p className="my-8 text-lg lg:text-2xl font-semibold">
        {webcontent.page.description.content
        .split('\n')
        .flatMap((line, i) => [line, <br />])}
      </p>
      <div className="py-8">
        <Link
          className="bg-indigo-400 hover:bg-indigo-600 text-xl lg:text-3xl hover:text-white font-semibold py-2 px-6 rounded-full shadow-sm shadow-indigo-700 hover:shadow-indigo-900"
          to="/"
          title={webcontent.commons.buttons.backToHomeButton.hover.content}>
          {webcontent.commons.buttons.backToHomeButton.text.content}
        </Link>
      </div>
    </div>
  );
}
