<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductSaveRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $isUpdateRequest = $this->isMethod('PUT') || $this->isMethod('PATCH');
        $rules =  [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'product_category_id' => 'required|exists:product_categories,id',
            'anime_card_id' => 'required|exists:anime_cards,id',
            'product_rating' => 'nullable|numeric|between:0,5', // Assuming rating is from 0 to 5
            'warranty_details' => 'nullable|string',
            'stock' => 'required|integer|min:0',
        ];
        if ($isUpdateRequest) {
            $rules['image_url'] = 'nullable|image';
        } else {
            $rules['image_url'] = 'required|image';
        }

        return $rules;
    }
}
