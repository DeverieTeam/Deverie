import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import AutoFormField from "../components/AutoFormField";
import { registerpageWebcontentType } from "../types/registerpageWebcontentType";
import RegistrationValidationWindow from "../components/RegistrationValidationWindow";

export default function RegisterPage() {
  const webcontent = useLoaderData() as registerpageWebcontentType;

  const [isRegisterWindowOpened, SetIsRegisterWindowOpened] = useState(false);

  const minimumFieldLength: number = 4;
  const maximumFieldLength: number = 100;
  const maximumPasswordFieldLength: number = 25;
  const emailRegex =
    /^[a-zA-Z0-9]([.-]?[a-zA-Z0-9])*@[a-zA-Z]([_-]?[a-zA-Z])*\.[a-zA-Z]{2,4}$/;

  const [isWarningMessageShowed, setIsWarningMessageShowed] =
    useState<boolean>(false);

  const [frontWarningMessage, setFrontWarningMessage] = useState<string>("");

  function defineFrontWarningMessage(content?: string) {
    setIsWarningMessageShowed(true);
    if (content !== undefined) {
      setFrontWarningMessage(content);
    } else {
      if (usernameWarningMessage !== "") {
        setFrontWarningMessage(usernameWarningMessage);
      } else if (passwordWarningMessage !== "") {
        setFrontWarningMessage(passwordWarningMessage);
      } else if (passwordConfirmWarningMessage !== "") {
        setFrontWarningMessage(passwordConfirmWarningMessage);
      } else if (emailWarningMessage !== "") {
        setFrontWarningMessage(emailWarningMessage);
      }
    }
  }

  const [usernameWarningMessage, setUsernameWarningMessage] =
    useState<string>("");
  const [passwordWarningMessage, setPasswordWarningMessage] =
    useState<string>("");
  const [passwordConfirmWarningMessage, setPasswordConfirmWarningMessage] =
    useState<string>("");
  const [emailWarningMessage, setEmailWarningMessage] = useState<string>("");

  const [isUsernameValid, setIsUsernameValid] = useState<boolean>(true);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);
  const [isPasswordsMatching, setIsPasswordsMatching] = useState<boolean>(true);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);

  const [usernameFieldData, setUsernameFieldData] = useState<string>("");
  const handleUsernameChange = (e: string) => {
    setUsernameFieldData(e);
    setIsUsernameValid(
      (e.length >= minimumFieldLength && e.length <= maximumFieldLength) ||
        e === ""
    );

    if (e.length < minimumFieldLength) {
      setUsernameWarningMessage(
        webcontent.page.warningMessages.unvalidField.tooShort.content.replace(
          "{field}",
          webcontent.page.form.generalInformations.fields.username.content
        )
      );
    } else if (e.length > maximumFieldLength) {
      setUsernameWarningMessage(
        webcontent.page.warningMessages.unvalidField.tooLong.content
          .replace(
            "{field}",
            webcontent.page.form.generalInformations.fields.username.content
          )
          .replace("{max}", maximumFieldLength.toString())
      );
    } else {
      setUsernameWarningMessage("");
    }
  };

  const [passwordFieldData, setPasswordFieldData] = useState<string>("");
  const handlePasswordChange = (e: string) => {
    setPasswordFieldData(e);
    setIsPasswordValid(
      (e.length >= minimumFieldLength &&
        e.length <= maximumPasswordFieldLength) ||
        e === ""
    );
    setIsPasswordsMatching(e == passwordConfirmFieldData);

    if (e.length < minimumFieldLength) {
      setPasswordWarningMessage(
        webcontent.page.warningMessages.unvalidField.tooShort.content.replace(
          "{field}",
          webcontent.page.form.generalInformations.fields.password.content
        )
      );
    } else if (e.length > maximumPasswordFieldLength) {
      setPasswordWarningMessage(
        webcontent.page.warningMessages.unvalidField.tooLong.content
          .replace(
            "{field}",
            webcontent.page.form.generalInformations.fields.password.content
          )
          .replace("{max}", maximumPasswordFieldLength.toString())
      );
    } else if (e != passwordConfirmFieldData) {
      setPasswordWarningMessage(
        webcontent.page.warningMessages.passwordsNotMatching.content
      );
    } else {
      setPasswordWarningMessage("");
    }
  };

  const [passwordConfirmFieldData, setPasswordConfirmFieldData] =
    useState<string>("");
  const handlePasswordConfirmChange = (e: string) => {
    setPasswordConfirmFieldData(e);
    setIsPasswordsMatching(passwordFieldData == e);

    if (passwordFieldData != e) {
      setPasswordConfirmWarningMessage(
        webcontent.page.warningMessages.passwordsNotMatching.content
      );
    } else if (e.length < minimumFieldLength) {
      setPasswordConfirmWarningMessage(
        webcontent.page.warningMessages.unvalidField.tooShort.content.replace(
          "{field}",
          webcontent.page.form.generalInformations.fields.confirmPassword
            .content
        )
      );
    } else if (e.length > maximumPasswordFieldLength) {
      setPasswordConfirmWarningMessage(
        webcontent.page.warningMessages.unvalidField.tooLong.content
          .replace(
            "{field}",
            webcontent.page.form.generalInformations.fields.confirmPassword
              .content
          )
          .replace("{max}", maximumPasswordFieldLength.toString())
      );
    } else {
      setPasswordConfirmWarningMessage("");
    }
  };

  const [emailFieldData, setEmailFieldData] = useState<string>("");
  const handleEmailChange = (e: string) => {
    setEmailFieldData(e);
    setIsEmailValid(
      (emailRegex.test(e) &&
        e.length >= minimumFieldLength &&
        e.length <= maximumFieldLength) ||
        e === ""
    );

    if (!emailRegex.test(e)) {
      setEmailWarningMessage(
        webcontent.page.warningMessages.emailNotMatching.content
      );
    } else if (e.length > maximumFieldLength) {
      setEmailWarningMessage(
        webcontent.page.warningMessages.unvalidField.tooLong.content
          .replace(
            "{field}",
            webcontent.page.form.generalInformations.fields.email.content
          )
          .replace("{max}", maximumFieldLength.toString())
      );
    } else {
      setEmailWarningMessage("");
    }
  };

  const [pronounsFieldData, setPronounsFieldData] = useState<string>("");
  const handlePronounsChange = (e: string) => {
    setPronounsFieldData(e);
  };

  const [showEmailFieldData, setShowEmailFieldData] = useState<boolean>(false);
  const handleShowEmailChange = () => {
    setShowEmailFieldData(!showEmailFieldData);
  };

  const [descriptionFieldData, setDescriptionFieldData] = useState<string>("");
  const handleDescriptionChange = (e: string) => {
    setDescriptionFieldData(e);
  };

  const handleSubmit = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();

    if (
      usernameFieldData === "" ||
      passwordFieldData === "" ||
      passwordConfirmFieldData === "" ||
      emailFieldData === "" ||
      !isUsernameValid ||
      !isPasswordValid ||
      !isPasswordsMatching ||
      !isEmailValid
    ) {
      defineFrontWarningMessage();
      return;
    }

    const body: {
      name: string;
      password: string;
      email: string;
      is_email_displayed: boolean;
      pronouns?: string;
      description?: string;
    } = {
      name: usernameFieldData,
      password: passwordFieldData,
      email: emailFieldData,
      is_email_displayed: showEmailFieldData,
    };

    if (pronounsFieldData) {
      body.pronouns = pronounsFieldData;
    }
    if (descriptionFieldData) {
      body.description = descriptionFieldData;
    }

    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        // const result = await response.json();
        // console.log(result);
        SetIsRegisterWindowOpened(true);
      } else {
        const result = await response.json();
        switch (result.message) {
          case "Invalid name and email":
            defineFrontWarningMessage(
              webcontent.page.warningMessages.conflicts.unvalidNameAndEmail
                .content
            );
            return;
          case "Invalid name":
            defineFrontWarningMessage(
              webcontent.page.warningMessages.conflicts.unvalidName.content.replace(
                "{username}",
                usernameFieldData
              )
            );
            return;
          case "Invalid email":
            defineFrontWarningMessage(
              webcontent.page.warningMessages.conflicts.unvalidEmail.content
            );
            return;
          default:
            return;
        }
      }
    } catch (error) {
      console.error("Something went wrong: ", error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsWarningMessageShowed(false);
    }, 3000);
  }, [frontWarningMessage, isWarningMessageShowed]);

  return (
    <div className="w-full relative pb-24 flex flex-col">
      <p className="mx-auto my-4 text-center text-indigo-500 text-3xl md:text-4xl font-bold drop-shadow">
        {webcontent.page.title.content}
      </p>
      <form
        className="xl:max-w-[90%] mx-2 xl:mx-auto my-6 flex flex-col xl:flex-row flex-wrap gap-12"
        onSubmit={handleSubmit}
      >
        <div className="flex-1 mx-auto">
          <p className="text-lg md:text-xl xl:text-2xl mr-4 mb-8">
            {webcontent.page.form.generalInformations.main.content}
          </p>
          <div className="flex flex-col gap-4 md:gap-6 xl:gap-8">
            <AutoFormField
              type="text"
              id="usernameField"
              title={
                webcontent.page.form.generalInformations.fields.username.content
              }
              state={usernameFieldData}
              handleChange={handleUsernameChange}
              isObligatory={true}
              isError={!isUsernameValid}
              warningMessage={usernameWarningMessage}
            />
            <AutoFormField
              type="password"
              id="passwordField"
              title={
                webcontent.page.form.generalInformations.fields.password.content
              }
              state={passwordFieldData}
              handleChange={handlePasswordChange}
              isObligatory={true}
              isError={!(isPasswordValid && isPasswordsMatching)}
              warningMessage={passwordWarningMessage}
            />
            <AutoFormField
              type="password"
              id="confirmPasswordField"
              title={
                webcontent.page.form.generalInformations.fields.confirmPassword
                  .content
              }
              state={passwordConfirmFieldData}
              handleChange={handlePasswordConfirmChange}
              isObligatory={true}
              isError={!(isPasswordValid && isPasswordsMatching)}
              warningMessage={passwordConfirmWarningMessage}
            />
            <AutoFormField
              type="email"
              id="emailField"
              title={
                webcontent.page.form.generalInformations.fields.email.content
              }
              state={emailFieldData}
              handleChange={handleEmailChange}
              isObligatory={true}
              isError={!isEmailValid}
              warningMessage={emailWarningMessage}
            />
          </div>
        </div>
        <div className="flex-1 mx-auto">
          <p className="text-lg md:text-xl xl:text-2xl mr-4 mb-8">
            {webcontent.page.form.complementaryInformations.main.content}
          </p>
          <div className="flex flex-col gap-2 xl:gap-4">
            <AutoFormField
              type="text"
              id="pronounsField"
              title={
                webcontent.page.form.complementaryInformations.fields.pronouns
                  .content
              }
              state={pronounsFieldData}
              handleChange={handlePronounsChange}
            />
            <AutoFormField
              type="checkbox"
              id="showEmailField"
              title={
                webcontent.page.form.complementaryInformations.fields.showEmail
                  .content
              }
              state={showEmailFieldData}
              handleChange={handleShowEmailChange}
            />
            <AutoFormField
              type="textarea"
              id="descriptionField"
              title={
                webcontent.page.form.complementaryInformations.fields
                  .description.content
              }
              state={descriptionFieldData}
              handleChange={handleDescriptionChange}
            />
          </div>
        </div>
        <div className="mx-auto w-full max-w-[90%] flex-2 flex flex-col gap-4">
          {isWarningMessageShowed ? (
            <p className="text-red-700 mx-auto text-sm md:text-lg">
              {frontWarningMessage}
            </p>
          ) : (
            <></>
          )}
          <div className="mx-auto w-full flex justify-evenly xl:justify-between">
            <p className="text-xs md:text-sm xl:text-base">
              <span className="text-red-600">*</span>
              {webcontent.page.form.obligatoryFieldsMessage.content}
            </p>
            <input
              className="py-1 px-4 md:px-8 text-center text-lg md:text-xl enabled:hover:text-white bg-indigo-400 enabled:hover:bg-indigo-600 rounded-full shadow-sm shadow-indigo-700 enabled:hover:shadow-indigo-900 disabled:opacity-50"
              type="submit"
              title={webcontent.page.submitButton.hover.content}
              value={webcontent.page.submitButton.text.content}
            />
          </div>
        </div>
      </form>
      {isRegisterWindowOpened && (
        <RegistrationValidationWindow
          usernameFieldData={usernameFieldData}
          webcontent={webcontent.page.validationWindow}
        />
      )}
    </div>
  );
}
