import { useState } from 'react';
import { X, Upload } from 'lucide-react';
import Step from './Step';
import { Controller, useFormContext } from 'react-hook-form';
import Input from '../../ui/Input';
import ErrorMessage from '../../ui/ErrorMessage';

type FormDataInputs = { images: File[] };

function ImageUploadStep({ required = false }: { required?: boolean }) {
  const [formData, setFormData] = useState<FormDataInputs>({ images: [] });
  const { control, setValue } = useFormContext<FormDataInputs>();

  // Remove image by index
  const onImageRemove = (index: number) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    setFormData({ images: updatedImages });
    setValue('images', updatedImages);
  };

  return (
    <Step title="Image Upload">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload Images</h2>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <p className="text-sm text-blue-800">
            Upload local image files to showcase your property. Accepted formats: JPG, PNG, WEBP.
          </p>
        </div>

        {/*  File Upload Button */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Images</label>
          <div className="flex items-center space-x-4">
            <label
              htmlFor="file-upload"
              className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
            >
              <Upload className="w-5 h-5 mr-2" />
              Choose Files
            </label>

            <Controller
              control={control}
              name="images"
              rules={required ? { required: 'image upload is required' } : undefined}
              render={({ field: { onChange, value } }) => (
                <>
                  <Input
                    id="file-upload"
                    type="file"
                    multiple
                    accept="image/png, image/jpeg, image/webp"
                    className="hidden"
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files && files.length > 0) {
                        const fileArray = Array.from(files);
                        const newImages = [...(value || []), ...fileArray];
                        onChange(newImages);
                        setFormData({ images: newImages });
                      }
                    }}
                  />
                  <ErrorMessage name="images" />
                </>
              )}
            />

            {formData.images.length > 0 && (
              <span className="text-sm text-gray-600">
                {formData.images.length} file
                {formData.images.length > 1 ? 's' : ''} selected
              </span>
            )}
          </div>
        </div>

        {/*  Preview Section */}
        {formData.images.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Selected Images ({formData.images.length})
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {formData.images.map((file, index) => {
                const imageUrl = URL.createObjectURL(file);
                return (
                  <div key={index} className="relative group">
                    <img
                      src={imageUrl}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border border-gray-200 shadow-sm"
                      onLoad={() => URL.revokeObjectURL(imageUrl)}
                    />
                    <button
                      type="button"
                      onClick={() => onImageRemove(index)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </Step>
  );
}

export default ImageUploadStep;
