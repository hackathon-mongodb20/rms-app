package io.rms.app.dto;

import lombok.Data;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class ResultDTO<T> {

	@NonNull
	T content;
	
}
