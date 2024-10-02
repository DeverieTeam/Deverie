/*import { useState, useEffect } from 'react';*/
import { useLoaderData } from 'react-router-dom';
import { backOfficeTagsManagementWebcontentType } from '../../types/backoffice/backOfficeTagsManagementWebcontentType';

export default function BackOfficeTagsManagement() {

  const webcontent = useLoaderData() as backOfficeTagsManagementWebcontentType;

  async function addATag(tag: {
    name: string,
    icon: string,
    family: string
  }) {
    const response = await fetch('http://localhost:3000/tag', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tag),
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log(result);
    } else {
      console.log(response);
    }
  };

  return (
    <div className="flex flew-row flex-wrap gap-12 md:gap-8">
      <p className="mx-auto text-center text-indigo-500 text-2xl md:text-4xl font-semibold drop-shadow">
        {webcontent.page.title.content}
      </p>
    </div>
  );
}