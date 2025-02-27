<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AnimeCardSaveRequest extends FormRequest
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
            'short_id' => 'required|string',
            'description' => 'required|string',

            'rating' => 'required|numeric|between:0,10',
            'status' => 'required|in:ongoing,completed,upcoming',
            'seasons' => 'required|integer|min:1',
            'latest_episode' => 'required|integer|min:1',
            'anime_category_id' => 'required|exists:anime_categories,id',
        ];
        if ($isUpdateRequest) {
            $rules['image_url'] = 'nullable|image';
        } else {
            $rules['image_url'] = 'required|image';
        }

        return $rules;
    }
}
