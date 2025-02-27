<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EpisodeSaveRequest extends FormRequest
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

        $rules = [
            'anime_card_id' => 'required|exists:anime_cards,id',
        'title' => 'required|string|max:255',
        'description' => 'required|string',

        'episode_number' => 'required|integer|min:1',
        ];
        if ($isUpdateRequest) {
            $rules['video_url'] = 'nullable|file';
        } else {
            $rules['video_url'] = 'required|file';
        }

        return $rules;
    }
}
