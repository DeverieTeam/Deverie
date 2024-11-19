import { useLoaderData, useNavigate } from 'react-router-dom';
import { backOfficeMembersManagementWebcontentType } from '../../types/backoffice/backOfficeMembersManagementWebcontentType';
import Cookies from "universal-cookie";
import { useAuth } from "../../contexts/useAuth";

export default function BackOfficeUsersManagement() {

  const webcontent = useLoaderData() as backOfficeMembersManagementWebcontentType;
  const navigate = useNavigate();
  const { auth } = useAuth();

  return (
    <div className="flex flex-col gap-8 md:gap-6">
      <p className="mx-auto text-center text-indigo-500 text-2xl md:text-4xl font-semibold drop-shadow">
        {webcontent.page.title.content}
      </p>
    </div>
  );
}
