<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UserSaveRequest extends FormRequest {
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool     {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array     {
        $rules = [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'confirm_password' => 'required|same:password',
            'phone_number' => 'nullable|string|max:15',
            'image' => 'nullable|image',
            'about' => 'nullable|string|max:1000',
        ];

        // Modify rules for update requests
        if ($this->isMethod('PUT') || $this->isMethod('PATCH')) {
            // Use the current route parameter for user ID
            $userId = $this->route('id');

            $rules['email'] = 'required|string|email|max:255|unique:users,email,' . $userId;
            $rules['password'] = 'nullable|string|min:8';
            $rules['confirm_password'] = 'nullable|same:password';
        }

        return $rules;
    }
}