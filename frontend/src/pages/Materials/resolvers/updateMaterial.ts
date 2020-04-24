import { message } from 'antd';
import { apollo, showLazyMessage, uploadToCloudinary } from 'utils';
import {
  MaterialsDocument,
  UpdateMaterialMutationFn,
  UpdateMaterialDocument,
  MaterialTagsDocument,
  CreateMaterialMutationVariables,
} from 'generated/graphql';
import { MaterialFormValues } from '../types';

const sendUpdateMaterialMutation = async (variables: CreateMaterialMutationVariables): Promise<void> => {
  await apollo.mutate<UpdateMaterialMutationFn>({
    mutation: UpdateMaterialDocument,
    variables,
    refetchQueries: [{ query: MaterialsDocument }, { query: MaterialTagsDocument }],
  });
};

export const updateMaterial = async (values: MaterialFormValues): Promise<boolean> => {
  const hideLoading = message.loading('Trwa aktualizacja materiału...', 0);
  let isSuccess: boolean;
  let image = typeof values.image === 'string' ? values.image : '';

  try {
    if (values.image && typeof values.image !== 'string') {
      image = await uploadToCloudinary(values.image, 'materialThumbnail');
    }
    await sendUpdateMaterialMutation({ ...values, image });
    showLazyMessage('success', 'Zaktualizowałeś materiał');
    isSuccess = true;
  } catch (ex) {
    console.error(ex);
    showLazyMessage('error', 'Podczas aktualizacji materiału wystąpił błąd');
    isSuccess = false;
  } finally {
    hideLoading();
  }

  return isSuccess;
};
