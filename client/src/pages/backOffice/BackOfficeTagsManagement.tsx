import { useState, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import TagDeletionConfirmationWindow from '../../components/backoffice/TagDeletionConfirmationWindow';
import { backOfficeTagsManagementWebcontentType } from '../../types/backoffice/backOfficeTagsManagementWebcontentType';
import Cookies from "universal-cookie";
import { useAuth } from "../../contexts/useAuth";

export default function BackOfficeTagsManagement() {

  const webcontent = useLoaderData() as backOfficeTagsManagementWebcontentType;
  const navigate = useNavigate();
  const { auth } = useAuth();

  const [isDeletionConfirmWindowDisplayed, setIsDeletionConfirmWindowDisplayed] = useState<boolean>(false);
  function handleDisplayDeletionConfirmationWindow() {
    if (deleteTagId !== "") {
      setIsDeletionConfirmWindowDisplayed(true);
    }
  }

  const tagsFamilies = ['language', 'environment', 'technology'];

  const [allTheTags, setAllTheTags] = useState<
  null |
  {
    id: number;
    name: string;
    family: string;
  }[]
  >(null);

  async function fetchAllTheTags() {
    const url = 'http://localhost:3000/tag';

    const languageTagsPromise = fetch(`${url}/${tagsFamilies[0]}`,
      {
        headers: {
          Accept: "application/json",
          "content-Type": "application/json",
        }
      }
    ).then(async (response) => {
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const result = await response.json();
      return result;
    });

    const environmentTagsPromise = fetch(`${url}/${tagsFamilies[1]}`,
      {
        headers: {
          Accept: "application/json",
          "content-Type": "application/json",
        }
      }
    ).then(async (response) => {
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const result = await response.json();
      return result;
    });

    const technologyTagsPromise = fetch(`${url}/${tagsFamilies[2]}`,
      {
        headers: {
          Accept: "application/json",
          "content-Type": "application/json",
        }
      }
    ).then(async (response) => {
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const result = await response.json();
      return result;
    });


    const [languageTags, environmentTags, technologyTags] = await Promise.all([
      languageTagsPromise,
      environmentTagsPromise,
      technologyTagsPromise
    ]);

    setAllTheTags([...languageTags, ...environmentTags, ...technologyTags]);
  }

  const [addTagName, setAddTagName] = useState<string>("");
  const handleAddTagNameChange = (e: string) => {
    setAddTagName(e);
  }

  const [addTagIcon, setAddTagIcon] = useState(null);
  const handleAddTagIconChange = (e: React.BaseSyntheticEvent) => {
    setAddTagIcon(e.target.files[0]);
  }
  const [addTagIconPreview, setAddTagIconPreview] = useState(undefined);

  const [addTagFamily, setAddTagFamily] = useState<string>("");
  const handleAddTagFamilyChange = (e: string) => {
    setAddTagFamily(e);
  }

  const handleAddTagSubmit = (e) => {
    e.preventDefault();
    if (
      addTagName
      && addTagIcon
      && addTagFamily
    ) {
      action({type: 'add'});
      setAddTagName("");
      setAddTagIcon("");
      setAddTagFamily("");
    }
  }

  const [modifyTagId, setModifyTagId] = useState<string>("");
  const handleModifyTagIdChange = (e: string) => {
    setModifyTagId(e);
    setModifyTagName(allTheTags.filter((tag) => tag.id === parseInt(e))[0].name);
    setModifyTagIcon(allTheTags.filter((tag) => tag.id === parseInt(e))[0].icon);
    setModifyTagFamily(allTheTags.filter((tag) => tag.id === parseInt(e))[0].family);
  }

  const [modifyTagName, setModifyTagName] = useState<string>("");
  const handleModifyTagNameChange = (e: string) => {
    setModifyTagName(e);
  }

  const [modifyTagIcon, setModifyTagIcon] = useState(null);
  const handleModifyTagIconChange = (e: React.BaseSyntheticEvent) => {
    setModifyTagIcon(e.target.files[0]);
  }
  const [modifyTagIconPreview, setModifyTagIconPreview] = useState(undefined);

  const [modifyTagFamily, setModifyTagFamily] = useState<string>("");
  const handleModifyTagFamilyChange = (e: string) => {
    setModifyTagFamily(e);
  }

  const handleModifyTagSubmit = (e) => {
    e.preventDefault();
    if (
      modifyTagId
      && modifyTagName
      && modifyTagFamily
    ) {
      action({type: 'modify'});
      setModifyTagId("");
      setModifyTagName("");
      setModifyTagIcon("");
      setModifyTagFamily("");
    }
  }

  const [deleteTagId, setDeleteTagId] = useState<string>("");
  const handleDeleteTagIdChange = (e: string) => {
    setDeleteTagId(e);
  }

  const handleDeleteTagButton = (e) => {
    setModifyTagId(e);
    if (deleteTagId) {
      action({type: 'delete'});
      setDeleteTagId("");
    }
  }

  async function action(args: {type: 'add' | 'modify' | 'delete'}) {
    const url: string = 'http://localhost:3000/tag';

    // only usefull with delete
    const endpoint: string = (args.type === 'delete' ? `?id=${deleteTagId.toString()}` : '');
    let httpVerb: string = '';

    // only usefull with add and modify
    let body: {
      id?: string;
      name: string;
      icon: string;
      family: string;
    } = {
      name: '',
      icon: '',
      family: '',
    };

    // only usefull with add and modify
    const formData = new FormData();
    
    switch (args.type) {
      case 'modify':
        httpVerb = 'PUT';
        formData.append("file", modifyTagIcon);
        
        body = {
          id: parseInt(modifyTagId),
          name: modifyTagName,
          icon: modifyTagIcon,
          family: modifyTagFamily,
        };
        break;
      case 'delete':
        httpVerb = 'DELETE';
        break;
      case 'add':
      default:
        httpVerb = 'POST';
        formData.append("file", addTagIcon);
        
        body = {
          name: addTagName,
          icon: addTagIcon,
          family: addTagFamily,
        };
        break;
    }

    try {
      const cookies = new Cookies(null, {
        path: '/',
      });
      const jwt = cookies.get('JWT');

      // if an image is uploaded
      if ([...formData][0] !== undefined && typeof [...formData][0][1] === "object") {
        const responseIcon = await fetch(`${url}${endpoint}/tagIcon`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
          body: formData,
        });

        if (responseIcon.ok) {
          const result = await responseIcon.json();
          body.icon = result.filename;
        }
      }

      const response = await fetch(`${url}${endpoint}`, {
        method: httpVerb,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(body),
      });

    } catch (error) {
      console.error("Something went wrong: ", error);
    }
    fetchAllTheTags();
  }

  useEffect(() => {
    fetchAllTheTags();
  });

  useEffect(() => {
    if (auth && auth.role && auth.role !== "administrator") {
      navigate("/");
    }
  }, [auth, navigate]);

  useEffect(() => {
    if (!addTagIcon) {
      setAddTagIconPreview(undefined);
    } else if (typeof addTagIcon === "string") {
      setAddTagIconPreview(addTagIcon);
    } else {
      const objectUrl = URL.createObjectURL(addTagIcon);
      setAddTagIconPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [addTagIcon]);

  useEffect(() => {
    if (!modifyTagIcon) {
      setModifyTagIconPreview(undefined);
    } else if (typeof modifyTagIcon === "string") {
      setModifyTagIconPreview(modifyTagIcon);
    } else {
      const objectUrl = URL.createObjectURL(modifyTagIcon);
      setModifyTagIconPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [modifyTagIcon]);

  return (
    <div className="flex flex-col gap-8 md:gap-6">
      <p className="mx-auto text-center text-indigo-500 text-2xl md:text-4xl font-semibold drop-shadow">
        {webcontent.page.title.content}
      </p>
      <div className="flex flex-row flex-wrap gap-6 p-6 xl:px-24 justify-evenly">
        
        <details className="w-full max-w-lg md:w-[45%] xl:max-w-xl">
          <summary className="text-center md:text-lg py-1 bg-neutral-100 hover:bg-white rounded-lg cursor-pointer shadow-sm shadow-neutral-400">
            {webcontent.page.actions.create.title.content}
          </summary>
          <form onSubmit={handleAddTagSubmit}
            className="w-full bg-neutral-100 mt-3 p-4 rounded-lg shadow-sm shadow-neutral-400">
            <p className="text-md md:text-xl xl:2xl">
              {webcontent.page.actions.create.windowTitle.content}
            </p>

            <div className="flex flex-col gap-2 mt-4 text-center">
              
              <div className="h-8 md:h-10 w-full flex flex-row md:gap-1 items-center justify-between">
                <label
                  htmlFor="modifyTagNameField"
                  className="pl-4 md:pl-0 flex-1 xl:text-lg">
                  {webcontent.page.fields.tagName.content}
                </label>
                <input required
                  id="modifyTagNameField"
                  className="bg-white text-center flex-1 px-2 w-[50%] focus:outline-none active:outline-none shadow-sm shadow-neutral-400 rounded-xl"
                  type="text"
                  value={addTagName}
                  onChange={(e) => handleAddTagNameChange(e.target.value)}>
                </input>
              </div>

              <div className="h-8 md:h-10 w-full flex flex-row md:gap-1 items-center justify-between">
                <label
                  htmlFor="modifyTagIconField"
                  className="pl-4 md:pl-0 flex-1 xl:text-lg">
                  {webcontent.page.fields.tagLogo.content}
                </label>
                <input required
                  id="modifyTagIconField" 
                  className="w-[70%] md:w-[60%] flex-1 focus:outline-none active:outline-none"
                  type="file"
                  src={addTagIconPreview}
                  onChange={handleAddTagIconChange}
                  accept=".png, .jpg">
                </input>
              </div>

              <div className="h-8 md:h-10 w-full flex flex-row md:gap-1 items-center justify-between">
                <label
                  htmlFor="addTagFamilyField"
                  className="pl-4 md:pl-0 flex-1 xl:text-lg">
                  {webcontent.page.fields.tagFamily.content}
                </label>
                <select required
                  id="addTagFamilyField"
                  className="max-w-[60%] px-2 text-xs md:text-base mx-auto text-center bg-white cursor-pointer shadow-sm shadow-neutral-400 rounded-lg"
                  onChange={(e) => handleAddTagFamilyChange(e.target.value)}
                  value={addTagFamily}>
                  <option value="">
                    {webcontent.page.placeholders.familySelect.content}
                  </option>
                  {tagsFamilies.map((family, index) =>
                    <option key={index} value={family}>
                      {webcontent.page.tagsFamilies[family].content}
                    </option> 
                  )}
                </select>
              </div>

              <div className="h-8 md:h-10 w-full flex flex-row items-center">
                <label
                  className="pl-4 md:pl-0 flex-1 xl:text-lg">
                  {webcontent.page.fields.tagPreview.content}
                </label>
                <div className="bg-white gap-1 flex-1 rounded-lg">
                  <label className="text-sm md:text-base gap-1 flex justify-center">
                    {addTagIconPreview ?
                      <img
                        className="h-5 w-5 bg-neutral-100 rounded-lg"
                        src={addTagIconPreview}
                      />
                      :
                      <></>
                    }
                    {addTagName}
                  </label>
                </div>
              </div>

              <input
                className="ml-auto max-w-[50%] py-1 px-4 md:px-8 text-center text-lg md:text-xl enabled:hover:text-white bg-indigo-400 enabled:hover:bg-indigo-600 rounded-full shadow-sm shadow-indigo-700 enabled:hover:shadow-indigo-900 disabled:opacity-50"
                type="submit"
                title={webcontent.commons.buttons.submit.hover.content}
                value={webcontent.commons.buttons.submit.text.content}
              />
            </div>
          </form>
        </details>

        <details className="w-full max-w-lg md:w-[45%] xl:max-w-xl">
          <summary className="text-center md:text-lg py-1 bg-neutral-100 hover:bg-white rounded-lg cursor-pointer shadow-sm shadow-neutral-400">
            {webcontent.page.actions.modify.title.content}
          </summary>
          <form onSubmit={handleModifyTagSubmit}
            className="w-full bg-neutral-100 mt-3 p-4 rounded-lg shadow-sm shadow-neutral-400">
            <p className="text-md md:text-xl xl:2xl">
              {webcontent.page.actions.modify.windowTitle.content}
            </p>

            <div className="flex flex-col gap-2 mt-4 text-center">
              <select required
                className="max-w-[60%] px-2 text-xs md:text-base mx-auto text-center bg-white cursor-pointer shadow-sm shadow-neutral-400 rounded-lg"
                onChange={(e) => handleModifyTagIdChange(e.target.value)}
                value={modifyTagId}>
                <option value="">
                  {webcontent.page.placeholders.tagSelect.content}
                </option>
                {allTheTags !== null ?
                  (allTheTags.map((tag, index) =>
                    <option key={index} value={tag.id}>
                      {tag.name}
                    </option> 
                  ))
                :
                  <></>
                }
              </select>

              <div className="h-8 md:h-10 w-full flex flex-row md:gap-1 items-center justify-between">
                <label
                  htmlFor="modifyTagNameField"
                  className="pl-4 md:pl-0 flex-1 xl:text-lg">
                  {webcontent.page.fields.tagName.content}
                </label>
                <input required
                  id="modifyTagNameField"
                  className="bg-white text-center flex-1 px-2 w-[50%] focus:outline-none active:outline-none shadow-sm shadow-neutral-400 rounded-xl"
                  type="text"
                  value={modifyTagName}
                  onChange={(e) => handleModifyTagNameChange(e.target.value)}>
                </input>
              </div>

              <div className="h-8 md:h-10 w-full flex flex-row md:gap-1 items-center justify-between">
                <label
                  htmlFor="modifyTagIconField"
                  className="pl-4 md:pl-0 flex-1 xl:text-lg">
                  {webcontent.page.fields.tagLogo.content}
                </label>
                <input
                  id="modifyTagIconField" 
                  className="w-[70%] md:w-[60%] flex-1 focus:outline-none active:outline-none"
                  type="file"
                  src={modifyTagIconPreview}
                  onChange={handleModifyTagIconChange}
                  accept=".png, .jpg">
                </input>
              </div>

              <div className="h-8 md:h-10 w-full flex flex-row md:gap-1 items-center justify-between">
                <label
                  htmlFor="modifyTagFamilyField"
                  className="pl-4 md:pl-0 flex-1 xl:text-lg">
                  {webcontent.page.fields.tagFamily.content}
                </label>
                <select required
                  id="modifyTagFamilyField"
                  className="max-w-[60%] px-2 text-xs md:text-base mx-auto text-center bg-white cursor-pointer shadow-sm shadow-neutral-400 rounded-lg"
                  onChange={(e) => handleModifyTagFamilyChange(e.target.value)}
                  value={modifyTagFamily}>
                  <option value="">
                    {webcontent.page.placeholders.familySelect.content}
                  </option>
                  {tagsFamilies.map((family, index) =>
                    <option key={index} value={family}>
                      {webcontent.page.tagsFamilies[family].content}
                    </option> 
                  )}
                </select>
              </div>

              <div className="h-8 md:h-10 w-full flex flex-row items-center">
                <label
                  className="pl-4 md:pl-0 flex-1 xl:text-lg">
                  {webcontent.page.fields.tagPreview.content}
                </label>
                <div className="bg-white gap-1 flex-1 rounded-lg">
                  <label className="text-sm md:text-base gap-1 flex justify-center">
                    {modifyTagIconPreview ?
                      <img
                        className="h-5 w-5 bg-neutral-100 rounded-lg"
                        src={modifyTagIconPreview}
                      />
                      :
                      <></>
                    }
                    {modifyTagName}
                  </label>
                </div>
              </div>

              <input
                className="ml-auto max-w-[50%] py-1 px-4 md:px-8 text-center text-lg md:text-xl enabled:hover:text-white bg-indigo-400 enabled:hover:bg-indigo-600 rounded-full shadow-sm shadow-indigo-700 enabled:hover:shadow-indigo-900 disabled:opacity-50"
                type="submit"
                title={webcontent.commons.buttons.submit.hover.content}
                value={webcontent.commons.buttons.submit.text.content}
              />
            </div>
          </form>
        </details>

        <details className="w-full max-w-lg md:w-[45%] xl:max-w-xl">
          <summary className="text-center md:text-lg py-1 bg-neutral-100 hover:bg-white rounded-lg cursor-pointer shadow-sm shadow-neutral-400">
            {webcontent.page.actions.delete.title.content}
          </summary>
          <div className="w-full bg-neutral-100 mt-3 p-4 rounded-lg shadow-sm shadow-neutral-400 flex flex-col gap-4">
            <p className="text-md md:text-xl xl:2xl">
              {webcontent.page.actions.delete.windowTitle.content}
            </p>

            <div className="flex flex-row gap-2 mt-4 text-center">
              <label
                htmlFor="deleteTagId"
                className="pl-4 md:pl-8 xl:text-lg">
                {webcontent.page.fields.tagName.content}
              </label>
              <select
                id="deleteTagId"
                className="max-w-[60%] px-2 text-xs md:text-base mx-auto text-center bg-white cursor-pointer shadow-sm shadow-neutral-400 rounded-lg"
                onChange={(e) => handleDeleteTagIdChange(e.target.value)}
                value={deleteTagId}>
                <option value="">
                  {webcontent.page.placeholders.tagSelect.content}
                </option>
                {allTheTags !== null ?
                  (allTheTags.map((tag, index) =>
                    <option key={index} value={tag.id}>
                      {tag.name}
                    </option> 
                  ))
                :
                  <></>
                }
              </select>
            </div>

            <button
              className="ml-auto max-w-[50%] py-1 px-4 md:px-8 text-center text-lg md:text-xl enabled:hover:text-white bg-indigo-400 enabled:hover:bg-indigo-600 rounded-full shadow-sm shadow-indigo-700 enabled:hover:shadow-indigo-900 disabled:opacity-50"
              onClick={handleDisplayDeletionConfirmationWindow}
              title={webcontent.commons.buttons.submit.hover.content}>
                {webcontent.commons.buttons.submit.text.content}
            </button>
          </div>
        </details>
      </div>
      {isDeletionConfirmWindowDisplayed && (
        <TagDeletionConfirmationWindow
          setIsDeletionConfirmWindowDisplayed={setIsDeletionConfirmWindowDisplayed}
          handleConfirm={handleDeleteTagButton}
          tagName={allTheTags.filter((tag) => tag.id === parseInt(deleteTagId))[0].name}
          webcontent={{buttons: webcontent.page.buttons, warnings: webcontent.page.warnings}}
        />
      )}
    </div>
  );
}