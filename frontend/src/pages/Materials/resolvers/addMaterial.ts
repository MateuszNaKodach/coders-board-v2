import { message } from 'antd';
import { apollo, showLazyMessage, uploadToCloudinary } from 'utils';
import {
  CreateMaterialDocument,
  CreateMaterialMutationFn,
  MaterialsDocument,
  CreateMaterialMutationVariables,
  MaterialTagsDocument,
} from 'generated/graphql';
import { MaterialFormValues } from '../types';

const sendAddMaterialMutation = async (variables: CreateMaterialMutationVariables): Promise<void> => {
  await apollo.mutate<CreateMaterialMutationFn>({
    mutation: CreateMaterialDocument,
    variables,
    refetchQueries: [{ query: MaterialsDocument }, { query: MaterialTagsDocument }],
  });
};

export const addMaterial = async (values: MaterialFormValues): Promise<boolean> => {
  const hideLoading = message.loading('Trwa dodawanie materiału...', 0);
  let isSuccess: boolean;
  let image = '';

  try {
    if (values.image && typeof values.image !== 'string') {
      image = await uploadToCloudinary(values.image, 'materialThumbnail');
    }
    await sendAddMaterialMutation({ ...values, image });
    showLazyMessage('success', 'Dodałeś nowy materiał');
    isSuccess = true;
  } catch (ex) {
    console.error(ex);
    showLazyMessage('error', 'Podczas dodawania materiału wystąpił błąd');
    isSuccess = false;
  } finally {
    hideLoading();
  }

  return isSuccess;
};
